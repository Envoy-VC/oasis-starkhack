import { exportToBlob } from '@excalidraw/excalidraw';
import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { type ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { sha1 } from '@noble/hashes/sha1';
import { createThirdwebClient } from 'thirdweb';
import { upload } from 'thirdweb/storage';
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

  const mintNFT = async () => {
    if (!store.excalidrawAPI) return;
    const elements = store.excalidrawAPI.getSceneElements();
    const appState = store.excalidrawAPI.getAppState();
    const files = store.excalidrawAPI.getFiles();

    const blob = await exportToBlob({
      elements,
      appState,
      files,
      mimeType: 'image/png',
    });

    const file = new File([blob], 'nft.png', {
      type: 'image/png',
    });

    // const client = createThirdwebClient({
    //   clientId: 'c9be81ac81ea89c5b75a4786d7e77194',
    // });

    // const cid = await upload({
    //   files: [file],
    //   client,
    //   uploadWithoutDirectory: true,
    // });

    // console.log(cid);

    const cidHex = `0x${Buffer.from('ipfs://QmTVkWpG2unQBi194MtrdFcNsNH6hdJ3izcsRVRsAeKxRr').toString('hex')}`;

    console.log({
      tokenId: '0x0',
      tokenURI: cidHex,
    });

    const res = await systemCalls.mintNFT({
      account,
      tokenId: '0x0',
      tokenURI: cidHex,
    });

    return res;
  };

  return {
    ...store,
    updateWhiteboard,
    shouldUpdate,
    syncWhiteboard,
    updateBoard,
    mintNFT,
  };
};
