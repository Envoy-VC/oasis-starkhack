import { type BurnerAccount } from '@dojoengine/create-burner';
import { Account } from 'starknet';
import { create } from 'zustand';
import { dojoConfig } from '~/dojo/config';
import { type SetupResult, setup } from '~/dojo/generated/setup';

export interface DojoState {
  initialized: boolean;
  setupResult: SetupResult | null;
  masterAccount: Account | null;
  account: BurnerAccount | null;
}

export interface DojoActions {
  setInitialized: (initialized: boolean) => void;
  setSetupResult: (state: SetupResult) => void;
  setMasterAccount: (state: Account) => void;
  setAccount: (state: BurnerAccount) => void;
}

export const useDojoStore = create<DojoState & DojoActions>((set) => ({
  initialized: false,
  setupResult: null,
  masterAccount: null,
  account: null,
  setInitialized: (initialized) => set({ initialized }),
  setSetupResult: (setupResult) => set({ setupResult }),
  setMasterAccount: (masterAccount) => set({ masterAccount }),
  setAccount: (account) => set({ account }),
}));

export const useDojo = () => {
  const {
    initialized,
    setupResult,
    masterAccount,
    account,
    setInitialized,
    setSetupResult,
    setMasterAccount,
    setAccount,
  } = useDojoStore();

  const initialize = async () => {
    if (initialized) return;
    const result = await setup(dojoConfig);
    setSetupResult(result);
    const masterAccount = new Account(
      result.dojoProvider.provider,
      result.config.masterAddress,
      result.config.masterPrivateKey,
      '1'
    );
    setMasterAccount(masterAccount);
    setInitialized(true);
  };

  return {
    initialize,
    setupResult,
    masterAccount,
    account,
    setSetupResult,
    setMasterAccount,
    setAccount,
  };
};

export default useDojo;
