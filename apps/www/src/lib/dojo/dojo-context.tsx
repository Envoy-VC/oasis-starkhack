/* eslint-disable @typescript-eslint/unbound-method -- safe */
import { type ReactNode, createContext, useContext } from 'react';

import {
  type BurnerAccount,
  useBurnerManager,
} from '@dojoengine/create-burner';
import { Account } from 'starknet';

import { type SetupResult } from './generated/setup';

interface DojoContextType extends SetupResult {
  burnerAccount: BurnerAccount | null;
}

export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SetupResult;
}) => {
  const currentValue = useContext(DojoContext);
  if (currentValue) throw new Error('DojoProvider can only be used once');

  const {
    config: { masterAddress, masterPrivateKey },
    burnerManager,
    dojoProvider,
  } = value;

  let burnerAccount: BurnerAccount | null = null;

  if (burnerManager) {
    const masterAccount = new Account(
      dojoProvider.provider,
      masterAddress,
      masterPrivateKey,
      '1'
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks -- safe
    const account = useBurnerManager({
      burnerManager,
    });

    burnerAccount = {
      ...account,
      account: account.account ?? masterAccount,
    };
  }

  return (
    <DojoContext.Provider
      value={{
        ...value,
        burnerAccount,
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};
