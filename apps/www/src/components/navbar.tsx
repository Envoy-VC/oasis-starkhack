import React from 'react';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

import Logo from '~/assets/logo.svg';

export const Navbar = () => {
  return (
    <div className='h-[6dvh] w-full border'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <div className='flex flex-row items-center gap-2'>
          <img
            alt='StarkSketch Logo'
            className='h-10'
            src={Logo as unknown as string}
          />
          <div className='text-2xl font-bold'>StarkSketch</div>
        </div>
        <DynamicWidget
          innerButtonComponent={<div>Connect Wallet</div>}
          variant='modal'
        />
      </div>
    </div>
  );
};
