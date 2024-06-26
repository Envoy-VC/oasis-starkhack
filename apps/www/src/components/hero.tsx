import React, { type PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import Illustration from '~/assets/illustration.svg';
import MousePointer from '~/assets/mouse-pointer.svg';

import { NewGame } from './new-game';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <div className='flex flex-col gap-4 py-12'>
      <div className='mx-auto text-center text-5xl font-semibold tracking-wide text-neutral-800 lg:text-7xl'>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-2 lg:gap-4'>
            <div className='relative'>
              <img
                alt='Mouse Pointer'
                className='absolute -bottom-24 -left-16 w-12'
                src={MousePointer as unknown as string}
              />
              <Box>Collaborate</Box>
            </div>
            , Sketch, Own.
          </div>
          <div className='py-4'>The Starknet Art Game</div>
          <div className='flex flex-col items-center justify-center text-center'>
            <p className='max-w-3xl text-center text-sm font-medium tracking-normal text-neutral-600'>
              Collaborate & create creations. See drawing history & mint your
              creation as an NFT. Guess the art with others! Built with Dojo
              Engine, Liveblocks, Dynamic for a seamless experience.
            </p>
            <Link to='/nfts'>
              <Button className='w-fit'>Discover Creations</Button>
            </Link>
          </div>
        </div>
      </div>
      <img
        alt='Illustration'
        className='mx-auto w-full max-w-2xl'
        src={Illustration as unknown as string}
      />
      <NewGame />
    </div>
  );
};

const Box = ({ children }: PropsWithChildren) => {
  return (
    <span className='relative border-4 border-dotted border-[#5487ff] bg-[#c3d5ff] px-3 py-1'>
      <div className='absolute right-0 top-0 aspect-square -translate-y-1/2 translate-x-1/2 bg-[#5487ff] p-[6px]' />
      <div className='absolute left-0 top-0 aspect-square -translate-x-1/2 -translate-y-1/2 bg-[#5487ff] p-[6px]' />
      <div className='absolute bottom-0 left-0 aspect-square -translate-x-1/2 translate-y-1/2 bg-[#5487ff] p-[6px]' />
      <div className='absolute bottom-0 right-0 aspect-square translate-x-1/2 translate-y-1/2 bg-[#5487ff] p-[6px]' />
      {children}
    </span>
  );
};
