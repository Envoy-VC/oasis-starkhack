import { useEffect } from 'react';

import { useDojo, useWhiteboard } from '~/lib/hooks';
import { deepMutable, errorHandler } from '~/lib/utils';

import {
  Excalidraw,
  LiveCollaborationTrigger,
  Sidebar,
  useHandleLibrary,
} from '@excalidraw/excalidraw';
import { LiveList, LiveObject } from '@liveblocks/client';
import { useStorage } from '@liveblocks/react';
import { useMutation } from '@liveblocks/react/suspense';
import { useAccount } from '@starknet-react/core';
import { toast } from 'sonner';

import { TextCopy } from './text-copy';
import { Button } from './ui/button';

import { Image, RefreshCcw } from 'lucide-react';

import { type MutableExcalidrawElement } from '~/types/liveblocks';

interface WhiteboardProps {
  gameID: string;
}

export const Whiteboard = ({ gameID }: WhiteboardProps) => {
  const {
    excalidrawAPI,
    setExcalidrawAPI,
    isSynced,
    setIsSynced,
    docked,
    setDocked,
    syncWhiteboard,
    updateWhiteboard,
    updateBoard,
    mintNFT,
  } = useWhiteboard();
  const {
    burnerAccount: {
      account: { address },
    },
  } = useDojo();

  const layers = useStorage((root) => {
    if (!excalidrawAPI) return null;
    const oldElements = excalidrawAPI.getSceneElements();
    const res = updateWhiteboard(root.layers, oldElements);
    excalidrawAPI.updateScene({
      elements: res.updatedBoardElements,
    });
    return res;
  });

  // sync every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // sync();
    }, 5000);
    return () => clearInterval(interval);
  }, [layers, excalidrawAPI, address]);

  const sync = () => {
    if (!excalidrawAPI) return;
    if (!layers) return;
    if (!address) return;

    const boardElements = deepMutable(excalidrawAPI.getSceneElements());

    const { shouldUpdateScene, updatedElements } = syncWhiteboard(
      layers,
      boardElements,
      address
    );
    if (!shouldUpdateScene) {
      setIsSynced(true);
      return;
    }
    updateScene(address, updatedElements as MutableExcalidrawElement[]);
    setIsSynced(true);
  };

  useHandleLibrary({ excalidrawAPI });

  const updateScene = useMutation(
    ({ storage }, key: string, elements: MutableExcalidrawElement[]) => {
      const data = elements.map((element) => {
        return new LiveObject(element);
      });
      storage.get('layers').set(key, new LiveList(data));
    },
    []
  );

  const saveState = async () => {
    if (!layers) return;
    try {
      const { boardID } = await updateBoard(layers.map, gameID);
      toast.success('State saved', { description: `ID: ${boardID}` });
    } catch (error) {
      toast.error(errorHandler(error));
    }
  };

  return (
    <div className='h-screen w-full'>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => (
          <div className='flex flex-row items-center gap-2'>
            <Button
              className='flex items-center gap-2'
              disabled={isSynced}
              onClick={sync}
            >
              {isSynced ? 'Synced' : 'Sync'}
              <RefreshCcw size={16} />
            </Button>
            <LiveCollaborationTrigger
              isCollaborating
              onSelect={() => {
                // TODO: implement dialog with all users
              }}
            />
            <Sidebar.Trigger
              className='!font-semibold'
              name='custom'
              tab='actions'
            >
              Actions
            </Sidebar.Trigger>
          </div>
        )}
      >
        <Sidebar docked={docked} name='custom' onDock={setDocked}>
          <Sidebar.Header />
          <Sidebar.Tabs>
            <Sidebar.Tab className='flex flex-col gap-2 p-3' tab='actions'>
              <div className='flex flex-row items-center gap-2'>
                <span>Game ID:</span>
                <TextCopy
                  text={gameID}
                  truncateOptions={{
                    length: 10,
                  }}
                />
              </div>
              <Button onClick={saveState}>Save State</Button>
              <Button className='flex items-center gap-2' onClick={mintNFT}>
                <Image size={16} />
                Mint NFT
              </Button>
            </Sidebar.Tab>
          </Sidebar.Tabs>
        </Sidebar>
      </Excalidraw>
    </div>
  );
};
