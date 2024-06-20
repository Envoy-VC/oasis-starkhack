import React from 'react';

import { truncate } from '~/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export const BurnerConnect = () => {
  const addresses = [
    '0x6658135c023e062e0878cc81e40e207b5b12857d31823b48b4bfb35cdf1349e',
    '0x05f5ad291b88cf3d39f6213ed50883dd640ee75d3636a19b39be816961e80bd3',
    '0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8',
  ];
  return (
    <div>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Burner Account' />
        </SelectTrigger>
        <SelectContent>
          {addresses.map((address) => (
            <SelectItem key={address} value={address}>
              {truncate(address)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
