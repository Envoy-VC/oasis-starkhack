import React from 'react';

import { useDojo } from '~/lib/hooks';
import { truncate } from '~/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Button } from './ui/button';

export const BurnerConnect = () => {
  const { burnerAccount } = useDojo();
  return (
    <div>
      <Select
        onValueChange={(value) => {
          burnerAccount.select(value);
        }}
      >
        <SelectTrigger className='w-[180px]'>
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
