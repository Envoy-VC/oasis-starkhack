import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDojo } from '~/lib/hooks';
import { errorHandler } from '~/lib/utils';
import { getRandomWords } from '~/lib/words';

import { getComponentValue } from '@dojoengine/recs';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import ShortUniqueId from 'short-unique-id';
import { toast } from 'sonner';
import { hash } from 'starknet';

import { Button } from './ui/button';
import { Input } from './ui/input';

import { RefreshCcw } from 'lucide-react';

export const NewGame = () => {
  const [words, setWords] = useState<string[]>(getRandomWords(6));
  const [value, setValue] = useState('');
  const [gameID, setGameID] = useState('');
  const { systemCalls, burnerAccount, clientComponents } = useDojo();

  const navigate = useNavigate();

  const onCreate = async () => {
    const id = toast.loading('Creating game...');
    try {
      if (!value) return;
      const uid = new ShortUniqueId({ length: 10 });
      const gameID = uid.rnd();
      const gameIDHex = `0x${Buffer.from(gameID).toString('hex')}`;
      const wordHex = `0x${Buffer.from(value).toString('hex')}`;
      console.log({
        gameID,
        gameIDHex,
        wordHex,
      });
      const wordHash = hash.computeHashOnElements(['0x01', wordHex]);
      console.log('wordHash', wordHash);

      const res = await systemCalls.spawnWorld({
        account: burnerAccount.account,
        wordHash: value,
        gameId: gameID,
      });
      console.log('res', res);
      toast.success('Game created!', { id, description: `ID: ${gameID}` });
      navigate(`/game?id=${gameID}`);
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };

  const onJoin = async () => {
    try {
      if (!gameID) return;
      const gameIDBigInt = BigInt(`0x${Buffer.from(gameID).toString('hex')}`);
      const playerEntity = getEntityIdFromKeys([
        BigInt(burnerAccount.account.address),
        gameIDBigInt,
      ]);
      const playerComponent = getComponentValue(
        clientComponents.Player,
        playerEntity
      );

      if (!playerComponent) {
        // Join Game
        const res = await systemCalls.joinGame({
          account: burnerAccount.account,
          gameId: gameID,
        });
        console.log('res', res);
      }
      navigate(`/game?id=${gameID}`);
    } catch (error) {
      toast.error(errorHandler(error));
    }
  };

  return (
    <div className='mx-auto flex h-screen w-full max-w-3xl flex-col items-center justify-center gap-4'>
      <div className='flex flex-col gap-2 text-center'>
        <div className='text-3xl font-medium'>Create a new game</div>
        <p className='max-w-lg text-sm font-semibold text-neutral-600'>
          Select a word to start the game. You can also click on refresh to get
          a new set of words, or type in your own word.
        </p>
      </div>
      <div className='flex flex-row flex-wrap items-center gap-3 py-6'>
        {words.map((word) => (
          <Button
            key={word}
            className='inline-block cursor-pointer rounded-lg bg-neutral-200 px-2 py-1 text-base font-medium text-neutral-800'
            onClick={() => setValue(word)}
          >
            {word}
          </Button>
        ))}
        <Button
          className='h-10 w-10 p-0'
          onClick={() => setWords(getRandomWords(6))}
        >
          <RefreshCcw size={16} />
        </Button>
      </div>
      <div className='flex w-full max-w-[28rem] flex-col items-center gap-4'>
        <div className='flex w-full flex-row items-center justify-center gap-3'>
          <Input
            className='w-full border-neutral-900'
            placeholder='Type your own word'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={onCreate}>Start Game</Button>
        </div>
        <div className='flex w-full items-center gap-2 py-2 text-neutral-500'>
          <div className='w-full border border-neutral-400' />
          OR
          <div className='w-full border border-neutral-400' />
        </div>
        <div className='flex w-full flex-row items-center justify-center gap-3'>
          <Input
            className='w-full border-neutral-900'
            placeholder='Enter game ID'
            value={gameID}
            onChange={(e) => setGameID(e.target.value)}
          />
          <Button onClick={onJoin}>Join Game</Button>
        </div>
      </div>
    </div>
  );
};
