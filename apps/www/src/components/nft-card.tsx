import React from 'react';
import { Link } from 'react-router-dom';

import { useDojo } from '~/lib/hooks';
import { ipfsHashToUrl } from '~/lib/utils';

import { useComponentValue } from '@dojoengine/react';
import { type Entity } from '@dojoengine/recs';
import { hexToAscii } from '@dojoengine/utils';

import { TextCopy } from './text-copy';

interface NFTCardProps {
  nft: Entity;
}

export const NFTCard = (props: NFTCardProps) => {
  const {
    clientComponents: { ERC721Owner },
  } = useDojo();

  const nft = useComponentValue(ERC721Owner, props.nft);
  if (!nft) {
    return null;
  }
  const gameID = hexToAscii(String(nft.game_id));
  const tokenId = String(nft.token_id);

  return (
    <Link
      className='w-full rounded-lg bg-[#ceddff] p-3 shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]'
      to={`/nft?gameID=${gameID}&tokenId=${tokenId}`}
    >
      <div className='aspect-video rounded-md'>
        <img
          alt='Whiteboard'
          className='aspect-video w-full rounded-md object-cover'
          src={ipfsHashToUrl(hexToAscii(nft.token_uri))}
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
            <p className='flex flex-row items-center text-sm text-gray-500'>
              Owner:
              <TextCopy canCopy={false} text={nft.address.toString()} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
