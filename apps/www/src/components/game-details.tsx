import React from 'react';

import { useDojo } from '~/lib/hooks';

import { useEntityQuery } from '@dojoengine/react';
import { Has, getComponentValue } from '@dojoengine/recs';
import { toHex } from 'thirdweb';

import { TextCopy } from './text-copy';

interface GameDetailsProps {
  gameID: string;
}
export const GameDetails = ({ gameID }: GameDetailsProps) => {
  const {
    clientComponents: { Player },
  } = useDojo();

  const playerEntities = useEntityQuery([Has(Player)]);

  const players = playerEntities
    .map((entity) => {
      const player = getComponentValue(Player, entity);
      return player;
    })
    .filter((p) => p !== undefined)
    .filter((player) => player?.game_id.toString() === toHex(gameID));

  return (
    <div className='flex w-full basis-1/2 flex-col gap-1 rounded-xl bg-[#d5e2ff] p-4'>
      <div className='text-lg font-medium'>Game Details</div>
      <div className='flex flex-row items-center gap-2 text-sm'>
        <span className='font-medium'>Game ID:</span>
        <TextCopy text={gameID} />
      </div>
      <div className='text-base font-medium'>Players</div>
      <div className='flex flex-col gap-0'>
        {players.map((player, index) => (
          <div
            key={player.address}
            className='flex flex-row items-center gap-2 text-sm'
          >
            <span className='font-medium'>{`Player ${String(index + 1)}:`}</span>
            <TextCopy text={player?.address.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};
