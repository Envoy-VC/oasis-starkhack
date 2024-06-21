import React, { useState } from 'react';

import { useDojo } from '~/lib/hooks';
import { toHex } from '~/lib/utils';

import { getComponentValue } from '@dojoengine/recs';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useAccount } from '@starknet-react/core';
import { toast } from 'sonner';
import { hash } from 'starknet';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface GuessProps {
  gameID: string;
}

export const Guess = ({ gameID }: GuessProps) => {
  const [value, setValue] = useState<string>('');

  const {
    clientComponents: { Game },
    systemCalls: { guessWord },
  } = useDojo();

  const { account } = useAccount();

  const onGuess = async () => {
    if (!value) return;
    const id = toast.loading('Guessing word...');
    try {
      if (!account) {
        throw new Error('Connect your wallet to guess a word.');
      }
      const word = toHex(value);
      const gameIdHex = toHex(gameID);

      const computed = hash.computePedersenHash(gameIdHex, word);

      const res = await guessWord({ account, gameId: toHex(gameID), word });
      console.log('res', res);
      const gameEntity = getEntityIdFromKeys([BigInt(toHex(gameID))]);
      const game = getComponentValue(Game, gameEntity);

      if (!game) return;
      if (game.word_hash.toString() === computed) {
        toast.success('Correct guess!', { id });
      } else {
        toast.error('Incorrect guess!', { id });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      const jsonString = errorMessage.substring(
        errorMessage.indexOf(
          '{',
          errorMessage.indexOf('Transaction execution error: ')
        )
      );

      // Parse the JSON string
      const errorData = JSON.parse(jsonString) as {
        execution_error: string;
      };
      const executionError = errorData.execution_error;

      // Use a regular expression to extract the specific error message
      const errorMessageMatch = /Failure reason: "(?<temp1>.+?)"/.exec(
        executionError
      );

      if (errorMessageMatch?.[1]) {
        const specificErrorMessage = errorMessageMatch[1];
        toast.error(specificErrorMessage, { id });
      } else {
        toast.error('Something went wrong!', { id });
      }
    }
  };
  return (
    <div className='flex h-full w-full basis-1/2 flex-col gap-1 rounded-xl bg-[#d5e2ff] p-4'>
      <div className='text-lg font-medium'>Guess the Whiteboard Drawing</div>
      <div className='flex w-full flex-row items-center gap-2 py-6'>
        <Input
          placeholder='Enter your guess'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={onGuess}>Submit</Button>
      </div>
    </div>
  );
};
