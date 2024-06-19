'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { cn } from '~/lib/utils';

import {
  DynamicContextProvider,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core';
import { StarknetWalletConnectors } from '@dynamic-labs/starknet';
import { sepolia } from '@starknet-react/chains';
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  useConnect,
  useDisconnect,
  voyager,
} from '@starknet-react/core';
import { Navbar } from '~/components';

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <StarknetConfig
      chains={[sepolia]}
      explorer={voyager}
      provider={publicProvider()}
    >
      <DynamicProvider>
        <SyncDynamicStarknet>
          <div className={cn('flex flex-col overflow-x-hidden font-sans')}>
            <Navbar />
            {children}
          </div>
        </SyncDynamicStarknet>
      </DynamicProvider>
    </StarknetConfig>
  );
};

const DynamicProvider = ({ children }: PropsWithChildren) => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const syncConnect = (key: string) => {
    switch (key) {
      case 'argent':
        connect({ connector: argent() });
        break;
      case 'braavos':
        connect({ connector: braavos() });
        break;
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        walletConnectors: [StarknetWalletConnectors],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe
        environmentId: import.meta.env.VITE_DYNAMIC_ENV_ID as string,
        events: {
          onAuthSuccess: ({ primaryWallet }) => {
            if (!primaryWallet) return;
            const id = primaryWallet.key.toLowerCase();
            syncConnect(id);
          },
          onLogout: () => {
            disconnect();
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

const SyncDynamicStarknet = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, walletConnector } = useDynamicContext();
  const { connectAsync } = useConnect();

  useEffect(() => {
    const syncConnect = async (key: string) => {
      switch (key) {
        case 'argentx':
          await connectAsync({ connector: argent() });
          break;
        case 'braavos':
          await connectAsync({ connector: braavos() });
          break;
      }
    };
    if (isAuthenticated) {
      const id = walletConnector?.key.toLowerCase();
      console.log(id);
      if (id) {
        void syncConnect(id);
      }
    }
  }, [connectAsync, isAuthenticated, walletConnector?.key]);

  return children;
};
