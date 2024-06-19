import type { PropsWithChildren } from 'react';

import { LiveMap } from '@liveblocks/client';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';

export const Room = ({ children }: PropsWithChildren) => {
  return (
    <LiveblocksProvider
      publicApiKey={import.meta.env.VITE_LIVEBLOCKS_API_KEY as string}
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
