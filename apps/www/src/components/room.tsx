import { LiveMap } from '@liveblocks/client';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';

interface RoomProps {
  children: React.ReactNode;
  id: string;
}

export const Room = ({ children, id }: RoomProps) => {
  console.log(id);
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
