import dynamic from 'next/dynamic';

import React from 'react';

import { ConnectButton } from './connect-button';

const InitializeDojo = dynamic(async () => await import('../initialize-dojo'), {
  ssr: false,
});

export const Navbar = () => {
  return (
    <div className='h-[6dvh] w-full border'>
      <InitializeDojo />
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <div className='text-xl font-semibold'>Web3 Starter</div>
        <ConnectButton />
      </div>
    </div>
  );
};
