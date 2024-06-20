import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDojo } from '~/lib/hooks';
import { ipfsHashToUrl, truncate } from '~/lib/utils';

import { useComponentValue } from '@dojoengine/react';
import { getEntityIdFromKeys, hexToAscii } from '@dojoengine/utils';
import { toHex } from 'thirdweb';
import { GameDetails, Guess, Navbar } from '~/components';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

const NFTPage = () => {
  const {
    clientComponents: { ERC721Owner },
  } = useDojo();
  const [searchParams] = useSearchParams();

  const gameID = searchParams.get('gameID') ?? '';
  const tokenId = searchParams.get('tokenId') ?? '';

  const entity = getEntityIdFromKeys([BigInt(tokenId), BigInt(toHex(gameID))]);
  const nft = useComponentValue(ERC721Owner, entity);

  if (!nft) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className='mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-12'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/nfts'>NFTs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{truncate(gameID)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <img
          alt='Whiteboard'
          className='aspect-video w-full rounded-lg'
          src={ipfsHashToUrl(hexToAscii(nft.token_uri))}
        />
        <div className='grid grid-cols-2 gap-4'>
          <GameDetails gameID={gameID} />
          <Guess gameID={gameID} />
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
