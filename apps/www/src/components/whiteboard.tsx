'use client';

import { useState } from 'react';

import { deepMutable } from '~/lib/utils';

import {
  Excalidraw,
  LiveCollaborationTrigger,
  useHandleLibrary,
} from '@excalidraw/excalidraw';
import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { LiveList, LiveObject } from '@liveblocks/client';
import { useStorage } from '@liveblocks/react';
import { useMutation } from '@liveblocks/react/suspense';
import { useAccount } from '@starknet-react/core';

import { Button } from './ui/button';

import { type MutableExcalidrawElement } from '~/types/liveblocks';

/* eslint-disable import/no-default-export -- for dynamic import */
const Whiteboard = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const { address } = useAccount();

  const layers = useStorage((root) => {
    console.log('Store Layers: ', root.layers);
    const elements: MutableExcalidrawElement[] = [];
    const map = new Map<string, ExcalidrawElement[]>();
    root.layers.forEach((v, k) => {
      const mutableObj = deepMutable(v);
      elements.push(...mutableObj);
      map.set(k, [...(mutableObj as ExcalidrawElement[])]);
    });

    if (!excalidrawAPI) return;

    const newElements = elements as ExcalidrawElement[];
    const oldElements = excalidrawAPI.getSceneElements();
    // find common elements
    const commonElements = newElements.filter((element) =>
      oldElements.find((e) => e.id === element.id)
    );

    // find unique elements from new and old
    const uniqueNew = newElements.filter(
      (element) => !commonElements.find((e) => e.id === element.id)
    );
    const uniqueOld = oldElements.filter(
      (element) => !commonElements.find((e) => e.id === element.id)
    );

    // merge
    const result = [...commonElements, ...uniqueOld, ...uniqueNew];

    excalidrawAPI.updateScene({
      elements: result,
    });
    return {
      elements: result,
      map,
      storeElements: elements as ExcalidrawElement[],
    };
  });

  const shouldUpdate = (o: ExcalidrawElement[], n: ExcalidrawElement[]) => {
    // update if the length is different and ids are different
    if (o.length !== n.length) return true;
    const oldIDs = new Set(o.map((e) => e.id));
    const newIDs = new Set(n.map((e) => e.id));

    for (const id of oldIDs) {
      if (!newIDs.has(id)) return true;
    }

    return false;
  };

  const sync = () => {
    if (!excalidrawAPI) return;
    if (!layers) return;
    if (!address) return;
    const storeElements = layers.storeElements;

    const boardElements = deepMutable(excalidrawAPI.getSceneElements());

    // get elements that are not in the store
    const newElements = boardElements.filter(
      (element) => !storeElements.find((e) => e.id === element.id)
    );
    const updatedElements = [
      ...(layers.map.get(address) ?? []),
      ...newElements,
    ] as ExcalidrawElement[];
    const shouldUpdateScene = shouldUpdate(
      layers.map.get(address) ?? [],
      updatedElements
    );
    if (!shouldUpdateScene) return;
    console.log('Updating Scene');
    updateScene(address, updatedElements as MutableExcalidrawElement[]);
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

  return (
    <div>
      <div className='mx-auto h-[80vh] w-[80vw] border-4'>
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          renderTopRightUI={() => (
            <LiveCollaborationTrigger
              isCollaborating
              onSelect={() => {
                console.log('onSelect');
              }}
            />
          )}
        />
      </div>
      <Button onClick={sync}>Sync</Button>
    </div>
  );
};

export default Whiteboard;
