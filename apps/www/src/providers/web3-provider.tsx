'use client';

import type { PropsWithChildren } from 'react';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { StarknetWalletConnectors } from '@dynamic-labs/starknet';
import { env } from '~/env';

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <DynamicContextProvider
      settings={{
        walletConnectors: [StarknetWalletConnectors],
        environmentId: env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
