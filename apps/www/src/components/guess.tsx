import React, { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface GuessProps {
  gameID: string;
}

export const Guess = ({ gameID }: GuessProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <div className='flex h-full w-full basis-1/2 flex-col gap-1 rounded-xl bg-[#d5e2ff] p-4'>
      <div className='text-lg font-medium'>Guess the Whiteboard Drawing</div>
      <div className='flex w-full flex-row items-center gap-2 py-6'>
        <Input
          placeholder='Enter your guess'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => console.log(`You guessed: ${value}`)}>
          Submit
        </Button>
      </div>
    </div>
  );
};
