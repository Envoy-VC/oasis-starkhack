import React from 'react';
import { Link } from 'react-router-dom';

import { TextCopy } from './text-copy';

export const NFTCard = () => {
  const gameID = crypto.randomUUID();
  return (
    <Link
      className='w-full rounded-lg bg-[#ceddff] p-3 shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]'
      to={gameID}
    >
      <div className='aspect-video rounded-md'>
        <img
          alt='Whiteboard'
          className='aspect-video w-full rounded-md object-cover'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnf9UQ9mIkZoRWSY5l3oz2wGukuh5eVS8T2A&s'
        />
      </div>
      <div className='mt-4'>
        <div className='flex justify-between'>
          <div>
            <div className='flex flex-row items-center gap-2 text-base font-semibold'>
              Game ID:{' '}
              <span className='text-sm'>
                <TextCopy canCopy={false} text={gameID} />
              </span>
            </div>
            <p className='text-sm text-gray-500'>Owner</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
