import { DojoConfig, DojoProvider } from '@dojoengine/core';
import { BurnerManager } from '@dojoengine/create-burner';
import { getSyncEntities } from '@dojoengine/state';
import * as torii from '@dojoengine/torii-client';
import { Account, WeierstrassSignatureType } from 'starknet';

import { createClientComponents } from '../create-client-components';
import { createSystemCalls } from '../create-system-calls';
import { defineContractComponents } from './contract-components';
import { setupWorld } from './generated';
import { ActionsCalls } from './starksketch';
import { world } from './world';

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup({ ...config }: DojoConfig) {
  const toriiClient = await torii.createClient([], {
    rpcUrl: config.rpcUrl,
    toriiUrl: config.toriiUrl,
    relayUrl: '',
    worldAddress: config.manifest.world.address || '',
  });

  const contractComponents = defineContractComponents(world);
  const clientComponents = createClientComponents({ contractComponents });
  await getSyncEntities(toriiClient, contractComponents as any, []);

  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);

  const client = setupWorld(dojoProvider);

  const masterAccount = new Account(
    {
      rpc: config.rpcUrl,
    },
    config.masterAddress,
    config.masterPrivateKey
  );

  const burnerManager = new BurnerManager({
    masterAccount,
    accountClassHash: config.accountClassHash,
    rpcProvider: dojoProvider.provider,
    feeTokenAddress: config.feeTokenAddress,
  });

  try {
    await burnerManager.init(true);
    // if (burnerManager.list().length === 0) {
    // 	await burnerManager.create();
    // }
  } catch (e) {
    console.error(e);
  }

  console.log(burnerManager);

  return {
    client,
    clientComponents,
    contractComponents,
    systemCalls: createSystemCalls(
      { client },
      contractComponents,
      clientComponents
    ),
    publish: (typedData: string, signature: WeierstrassSignatureType) => {
      toriiClient.publishMessage(typedData, {
        r: signature.r.toString(),
        s: signature.s.toString(),
      });
    },
    config,
    dojoProvider,
    burnerManager,
    toriiClient,
  };
}
