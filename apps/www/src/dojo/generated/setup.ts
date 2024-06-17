import { type DojoConfig, DojoProvider } from '@dojoengine/core';
import { BurnerManager } from '@dojoengine/create-burner';
import { getSyncEntities } from '@dojoengine/state';
import { createClient } from '@dojoengine/torii-client';
import { Account, type WeierstrassSignatureType } from 'starknet';

import { createClientComponents } from '../create-client-components';
import { createSystemCalls } from '../create-system-calls';
import { defineContractComponents } from './contract-components';
import { setupWorld } from './generated';
import { world } from './world';

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export const setup = async ({ ...config }: DojoConfig) => {
  const toriiClient = await createClient([], {
    rpcUrl: config.rpcUrl,
    toriiUrl: config.toriiUrl,
    relayUrl: '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- manifest is json file
    worldAddress: config.manifest.world.address as string,
  });

  console.log('toriiClient', toriiClient);
  const contractComponents = defineContractComponents(world);
  const clientComponents = createClientComponents({
    contractComponents,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- contractComponents is not typed correctly
  await getSyncEntities(toriiClient, contractComponents as any, []);

  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);
  const client = setupWorld(dojoProvider);

  // create burner manager
  const burnerManager = new BurnerManager({
    masterAccount: new Account(
      {
        rpc: { nodeUrl: config.rpcUrl },
      },
      config.masterAddress,
      config.masterPrivateKey
    ),
    accountClassHash: config.accountClassHash,
    rpcProvider: dojoProvider.provider,
    feeTokenAddress: config.feeTokenAddress,
  });

  // try {
  //   await burnerManager.init();
  //   if (burnerManager.list().length === 0) {
  //     await burnerManager.create();
  //   }
  // } catch (e) {
  //   console.error(e);
  // }

  return {
    client,
    clientComponents,
    contractComponents,
    systemCalls: createSystemCalls(
      { client },
      contractComponents,
      clientComponents
    ),
    publish: async (typedData: string, signature: WeierstrassSignatureType) => {
      await toriiClient.publishMessage(typedData, {
        r: signature.r.toString(),
        s: signature.s.toString(),
      });
    },
    config,
    dojoProvider,
    burnerManager,
    toriiClient,
  };
};
