import {
  type ExcalidrawElement,
  type NonDeletedExcalidrawElement,
} from '@excalidraw/excalidraw/types/element/types';
import { type ToImmutable } from '@liveblocks/core';

import { deepMutable } from './utils';

import {
  type DeepMutableArray,
  type LayersType,
  type MutableExcalidrawElement,
} from '~/types/liveblocks';

export const shouldUpdate = (
  o: ExcalidrawElement[],
  n: ExcalidrawElement[]
) => {
  if (o.length !== n.length) return true;
  const oldIDs = new Set(o.map((e) => e.id));
  const newIDs = new Set(n.map((e) => e.id));

  for (const id of oldIDs) {
    if (!newIDs.has(id)) return true;
  }
  return false;
};

export const updateWhiteboard = (
  store: ToImmutable<LayersType>,
  boardElements: readonly NonDeletedExcalidrawElement[]
) => {
  const elements: MutableExcalidrawElement[] = [];
  const map = new Map<string, ExcalidrawElement[]>();
  store.forEach((v, k) => {
    const mutableObj = deepMutable(v);
    elements.push(...mutableObj);
    map.set(k, [...(mutableObj as ExcalidrawElement[])]);
  });

  const newElements = elements as ExcalidrawElement[];
  // find common elements
  const commonElements = newElements.filter((element) =>
    boardElements.find((e) => e.id === element.id)
  );

  // find unique elements from new and old
  const uniqueNew = newElements.filter(
    (element) => !commonElements.find((e) => e.id === element.id)
  );
  const uniqueOld = boardElements.filter(
    (element) => !commonElements.find((e) => e.id === element.id)
  );

  // merge
  const result = [...commonElements, ...uniqueOld, ...uniqueNew];

  return {
    map,
    updatedBoardElements: result,
    storeElements: elements as ExcalidrawElement[],
  };
};

type UpdateWhiteboardReturnType = ReturnType<typeof updateWhiteboard>;

export const syncWhiteboard = (
  store: UpdateWhiteboardReturnType,
  boardElements: DeepMutableArray<NonDeletedExcalidrawElement>,
  address: string
) => {
  // get elements that are not in the store
  const newElements = boardElements.filter(
    (element) => !store.storeElements.find((e) => e.id === element.id)
  );
  const updatedElements = [
    ...(store.map.get(address) ?? []),
    ...newElements,
  ] as ExcalidrawElement[];

  const shouldUpdateScene = shouldUpdate(
    store.map.get(address) ?? [],
    updatedElements
  );

  return {
    shouldUpdateScene,
    updatedElements,
  };
};
