import { getSyncEntities } from '@dojoengine/state';
import { DojoConfig, DojoProvider } from '@dojoengine/core';
import * as torii from '@dojoengine/torii-client';
import { createClientComponents } from '../create-client-components';
import { createSystemCalls } from '../create-system-calls';
import { defineContractComponents } from './contract-components';
import { world } from './world';
import { setupWorld } from './generated';
import { Account, WeierstrassSignatureType } from 'starknet';
import { BurnerManager } from '@dojoengine/create-burner';

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

  const client = await setupWorld(dojoProvider);

  const masterAccount = new Account(
    {
      rpc: config.rpcUrl,
    },
    config.masterAddress,
    config.masterPrivateKey
  );

  console.log(masterAccount);
  console.log(config);
  console.log(dojoProvider);

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
