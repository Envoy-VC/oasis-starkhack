import React from 'react';
import { useLocation } from 'react-router-dom';

import { truncate } from '~/lib/utils';

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
  const { pathname } = useLocation();
  const gameID = pathname.split('/').pop() ?? ''; // Get the last part of the URL
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
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnf9UQ9mIkZoRWSY5l3oz2wGukuh5eVS8T2A&s'
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
