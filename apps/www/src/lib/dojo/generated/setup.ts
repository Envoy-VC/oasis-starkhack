import { type DojoConfig, DojoProvider } from '@dojoengine/core';
import { BurnerManager } from '@dojoengine/create-burner';
import { getSyncEntities } from '@dojoengine/state';
import * as torii from '@dojoengine/torii-client';
import { Account, type WeierstrassSignatureType } from 'starknet';

import { createClientComponents } from '../create-client-components';
import { createSystemCalls } from '../create-system-calls';
import { defineContractComponents } from './contract-components';
import { setupWorld } from './generated';
import { world } from './world';

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup({ ...config }: DojoConfig) {
  console.log(config);
  const toriiClient = await torii.createClient([], {
    rpcUrl: import.meta.env.VITE_RPC_URL as string,
    toriiUrl: import.meta.env.VITE_TORII_URL as string,
    relayUrl: '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- safe
    worldAddress: config.manifest.world.address || '',
  });

  const contractComponents = defineContractComponents(world);
  const clientComponents = createClientComponents({ contractComponents });

  const isKatana = import.meta.env.VITE_CHAIN === 'KATANA';

  await getSyncEntities(
    toriiClient,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- safe
    contractComponents as any,
    []
  );

  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);
  const client = setupWorld(dojoProvider);

  let burnerManager: BurnerManager | null;

  if (isKatana) {
    const masterAccount = new Account(
      {
        nodeUrl: config.rpcUrl,
      },
      config.masterAddress,
      config.masterPrivateKey
    );

    burnerManager = new BurnerManager({
      masterAccount,
      accountClassHash: config.accountClassHash,
      rpcProvider: dojoProvider.provider,
      feeTokenAddress: config.feeTokenAddress,
    });

    try {
      await burnerManager.init();
      if (burnerManager.list().length === 0) {
        await burnerManager.create();
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    burnerManager = null;
  }

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
      void toriiClient.publishMessage(typedData, {
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
