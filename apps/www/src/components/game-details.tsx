import React from 'react';

import { TextCopy } from './text-copy';

interface GameDetailsProps {
  gameID: string;
}
export const GameDetails = ({ gameID }: GameDetailsProps) => {
  return (
    <div className='flex w-full basis-1/2 flex-col gap-1 rounded-xl bg-[#d5e2ff] p-4'>
      <div className='text-lg font-medium'>Game Details</div>
      <div className='flex flex-row items-center gap-2 text-sm'>
        <span className='font-medium'>Game ID:</span>
        <TextCopy text={gameID} />
      </div>
      <div className='text-base font-medium'>Players</div>
      <div className='flex flex-col gap-0'>
        <div className='flex flex-row items-center gap-2 text-sm'>
          <span className='font-medium'>Player 1:</span>
          <TextCopy text='0x1234567890' />
        </div>
        <div className='flex flex-row items-center gap-2 text-sm'>
          <span className='font-medium'>Player 2:</span>
          <TextCopy text='0x1234567890' />
        </div>
        <div className='flex flex-row items-center gap-2 text-sm'>
          <span className='font-medium'>Player 3:</span>
          <TextCopy text='0x1234567890' />
        </div>
        <div className='flex flex-row items-center gap-2 text-sm'>
          <span className='font-medium'>Player 4:</span>
          <TextCopy text='0x1234567890' />
        </div>
      </div>
    </div>
  );
};
