import React from 'react';
import { Link } from 'react-router-dom';

import { useAccount } from '~/lib/hooks';
import { truncate } from '~/lib/utils';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { argent, useConnect } from '@starknet-react/core';

import Logo from '~/assets/logo.svg';

import { BurnerConnect } from './burner-connect';
import { Button } from './ui/button';

export const Navbar = () => {
  const isKatana = import.meta.env.VITE_CHAIN === 'KATANA';

  const { address } = useAccount();
  const { connectAsync } = useConnect();

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
          {isKatana ? (
            <BurnerConnect />
          ) : (
            // <DynamicWidget
            //   innerButtonComponent={<div>Connect Wallet</div>}
            //   variant='modal'
            // />
            <Button
              onClick={async () => {
                await connectAsync({
                  connector: argent(),
                });
              }}
            >
              {truncate(address ?? 'Connect')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
