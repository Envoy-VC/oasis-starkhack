import { type ReactNode, createContext, useContext, useMemo } from 'react';

// import { BurnerAccount, useBurnerManager } from '@dojoengine/create-burner';
import { Account } from 'starknet';

import { type SetupResult } from './generated/setup';

interface DojoContextType extends SetupResult {
  masterAccount: Account;
  // burnerAccount: BurnerAccount;
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

  const masterAccount = useMemo(
    () =>
      new Account(dojoProvider.provider, masterAddress, masterPrivateKey, '1'),
    [masterAddress, masterPrivateKey, dojoProvider.provider]
  );

  // const burnerAccount = useBurnerManager({
  //   burnerManager,
  // });

  return (
    <DojoContext.Provider
      value={{
        ...value,
        masterAccount,
        // burnerAccount: {
        //   ...burnerAccount,
        //   account: burnerAccount.account ?? masterAccount,
        // },
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};
