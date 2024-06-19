import React from 'react';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

export const Navbar = () => {
  return (
    <div className='h-[6dvh] w-full border'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <div className='text-xl font-semibold'>Web3 Starter</div>
        <DynamicWidget variant='modal' />
      </div>
    </div>
  );
};