import React from 'react';
import { Link } from 'react-router-dom';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

import Logo from '~/assets/logo.svg';

// import { BurnerConnect } from './burner-connect';

export const Navbar = () => {
  return (
    <div className='h-[6dvh] w-full border'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <Link className='flex flex-row items-center gap-2' to='/'>
          <img
            alt='StarkSketch Logo'
            className='h-10'
            src={Logo as unknown as string}
          />
          <div className='text-2xl font-bold'>StarkSketch</div>
        </Link>
        <div className='flex flex-row gap-2'>
          {/* <BurnerConnect /> */}
          <DynamicWidget
            innerButtonComponent={<div>Connect Wallet</div>}
            variant='modal'
          />
        </div>
      </div>
    </div>
  );
};
