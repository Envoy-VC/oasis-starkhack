/* eslint-disable @typescript-eslint/unbound-method -- safe */
import { type ReactNode, createContext, useContext } from 'react';

import { type BurnerAccount } from '@dojoengine/create-burner';
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

    burnerAccount = {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- safe
      create: burnerManager.create,
      list: burnerManager.list,
      get: burnerManager.get,
      account: burnerManager.account ?? masterAccount,
      select: burnerManager.select,
      deselect: burnerManager.deselect,
      isDeploying: burnerManager.isDeploying,
      clear: burnerManager.clear,
      remove: burnerManager.delete,
      count: burnerManager.list().length,
      copyToClipboard: burnerManager.copyBurnersToClipboard,
      applyFromClipboard: burnerManager.setBurnersFromClipboard,
      checkIsDeployed: burnerManager.isBurnerDeployed,
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
