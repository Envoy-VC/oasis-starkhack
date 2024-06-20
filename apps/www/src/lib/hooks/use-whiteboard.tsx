import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { type ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { sha1 } from '@noble/hashes/sha1';
import { create } from 'zustand';

import { shouldUpdate, syncWhiteboard, updateWhiteboard } from '../whiteboard';
import { useDojo } from './use-dojo';

interface WhiteboardState {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  isSynced: boolean;
  docked: boolean;
}

interface WhiteboardActions {
  setExcalidrawAPI: (api: ExcalidrawImperativeAPI) => void;
  setIsSynced: (isSynced: boolean) => void;
  setDocked: (docked: boolean) => void;
}

export const useWhiteboardStore = create<WhiteboardState & WhiteboardActions>(
  (set) => ({
    excalidrawAPI: null,
    isSynced: false,
    docked: false,
    setExcalidrawAPI: (api) => set({ excalidrawAPI: api }),
    setIsSynced: (isSynced) => set({ isSynced }),
    setDocked: (docked) => set({ docked }),
  })
);

export const useWhiteboard = () => {
  const store = useWhiteboardStore();
  const {
    burnerAccount: { account },
    clientComponents: { Game, Player },
    systemCalls,
  } = useDojo();

  const updateBoard = async (
    map: Map<string, ExcalidrawElement[]>,
    gameID: string
  ) => {
    const userElements = map.get(account.address) ?? [];
    const data = JSON.stringify(userElements);
    const hash = `0x${Buffer.from(sha1(data)).toString('hex')}`;

    const gameIDHex = `0x${Buffer.from(gameID).toString('hex')}`;

    console.log({
      userElements,
      gameId: gameIDHex,
      boardId: hash,
    });

    const res = await systemCalls.updateBoard({
      account,
      gameId: gameIDHex,
      boardId: hash,
    });

    return {
      result: res,
      boardID: hash,
    };
  };

  return {
    ...store,
    updateWhiteboard,
    shouldUpdate,
    syncWhiteboard,
    updateBoard,
  };
};
