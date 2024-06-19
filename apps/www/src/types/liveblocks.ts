import { type NonDeletedExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  type LiveList,
  type LiveMap,
  type LiveObject,
} from '@liveblocks/client';

export type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutableArray<U>
  : T extends readonly (infer U)[]
    ? DeepMutableArray<U>
    : T extends object
      ? DeepMutableObject<T>
      : T;

export type DeepMutableArray<T> = DeepMutable<T>[];

export type DeepMutableObject<T> = {
  -readonly [K in keyof T]: DeepMutable<T[K]>;
};

export type ElementWithAddress = NonDeletedExcalidrawElement & {
  address: string;
};

export type MutableExcalidrawElement = DeepMutable<ElementWithAddress>;
export type BoardElement = LiveObject<MutableExcalidrawElement>;

export type LayersType = LiveMap<string, LiveList<BoardElement>>;
