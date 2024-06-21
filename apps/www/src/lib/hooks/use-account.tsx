import { useAccount as useStarknetAccount } from '@starknet-react/core';
import { type Account, type AccountInterface } from 'starknet';

import { useDojo } from './use-dojo';

interface UseAccountReturnType {
  account: AccountInterface | Account | undefined;
  address: string | undefined;
}

export const useAccount = (): UseAccountReturnType => {
  const { burnerAccount } = useDojo();
  const starknetAccount = useStarknetAccount();

  if (import.meta.env.VITE_CHAIN === 'KATANA' && burnerAccount) {
    return {
      account: burnerAccount.account,
      address: burnerAccount.account.address,
    };
  }
  return {
    account: starknetAccount.account,
    address: starknetAccount.address ?? '',
  };
};
