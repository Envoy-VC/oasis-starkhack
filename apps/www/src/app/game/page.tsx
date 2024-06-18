import dynamic from 'next/dynamic';

import React from 'react';

import { Room } from '~/components/room';

const Whiteboard = dynamic(
  async () => (await import('~/components/whiteboard')).default,
  {
    ssr: false,
  }
);

const GamePage = () => {
  return (
    <div>
      <Room>
        <Whiteboard />
      </Room>
    </div>
  );
};

export default GamePage;
