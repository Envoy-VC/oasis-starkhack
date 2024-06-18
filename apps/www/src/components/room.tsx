'use client';

import type { PropsWithChildren } from 'react';

import { LiveMap } from '@liveblocks/client';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { env } from '~/env';

export const Room = ({ children }: PropsWithChildren) => {
  return (
    <LiveblocksProvider
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe
      publicApiKey={env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY as string}
    >
      <RoomProvider
        id='my-room'
        initialStorage={{
          layers: new LiveMap(),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
