import React from 'react';

import { useDojo } from '~/lib/hooks';
import { truncate } from '~/lib/utils';

import { useComponentValue } from '@dojoengine/react';
import { getEntityIdFromKeys } from '@dojoengine/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Button } from './ui/button';

import { Coins } from 'lucide-react';

export const BurnerConnect = () => {
  const {
    burnerAccount,
    clientComponents: { CoinBalance },
  } = useDojo();

  const coinBalance = useComponentValue(
    CoinBalance,
    getEntityIdFromKeys([BigInt(burnerAccount?.account.address ?? '0')])
  );

  if (!burnerAccount) return null;

  const getActiveAccount = () => {
    return burnerAccount.getActiveAccount
      ? burnerAccount.getActiveAccount()?.address
      : undefined;
  };

  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='flex flex-row items-center gap-2 rounded-xl bg-white p-2'>
        <span>{Number(coinBalance?.balance ?? 0)}</span>
        <Coins className='text-amber-400' size={20} strokeWidth={3} />
      </div>
      <Select
        onValueChange={(value) => {
          burnerAccount.select(value);
        }}
      >
        <SelectTrigger
          className='w-[256px] bg-white'
          value={getActiveAccount()}
        >
          <SelectValue placeholder='Burner Account' />
        </SelectTrigger>
        <SelectContent>
          {burnerAccount.list().map((burner) => (
            <SelectItem key={burner.address} value={burner.address}>
              {truncate(burner.address)}
            </SelectItem>
          ))}
          <Button
            className='my-1 w-full'
            onClick={() => {
              burnerAccount.create();
            }}
          >
            Create Burner
          </Button>
        </SelectContent>
      </Select>
    </div>
  );
};
