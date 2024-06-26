import React from 'react';

import { useDojo } from '~/lib/hooks';

import { useEntityQuery } from '@dojoengine/react';
import { Has } from '@dojoengine/recs';
import { NFTCard, Navbar } from '~/components';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

const NFTs = () => {
  const {
    clientComponents: { ERC721Owner },
  } = useDojo();

  const nfts = useEntityQuery([Has(ERC721Owner)]);

  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      <div className='mx-auto flex w-full max-w-screen-xl flex-col py-12'>
        <Breadcrumb className='px-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>NFTs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='grid w-full grid-cols-1 gap-4 px-4 py-12 sm:grid-cols-2 md:grid-cols-3'>
          {nfts.map((nft) => {
            return <NFTCard key={nft.toString()} nft={nft} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NFTs;
