import { createDojoConfig } from '@dojoengine/core';

import manifest from './src/assets/manifest.json';

/**
 * rpcUrl: string;
    toriiUrl: string;
    relayUrl: string;
    masterAddress: string;
    masterPrivateKey: string;
    accountClassHash: string;
    feeTokenAddress: string;
    manifest: any;
 */
export const dojoConfig = createDojoConfig({
  rpcUrl: import.meta.env.VITE_RPC_URL as string,
  toriiUrl: import.meta.env.VITE_TORII_URL as string,
  relayUrl: '',
  masterAddress: import.meta.env.VITE_MASTER_ADDRESS as string,
  masterPrivateKey: import.meta.env.VITE_MASTER_PRIVATE_KEY as string,
  manifest,
});
