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

export const BurnerConnect = () => {
  const { account } = useDojo();
  return (
    <div>
      <Select
        onValueChange={(value) => {
          account.select(value);
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Burner Account' />
        </SelectTrigger>
        <SelectContent>
          {account.list().map((burner) => (
            <SelectItem key={burner.address} value={burner.address}>
              {truncate(burner.address)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
