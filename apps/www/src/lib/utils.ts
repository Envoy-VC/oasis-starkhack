import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DeepMutable, DeepMutableObject } from '~/types/liveblocks';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Direction {
  Left = 1,
  Right = 2,
  Up = 3,
  Down = 4,
}

export function updatePositionWithDirection(
  direction: Direction,
  value: { vec: { x: number; y: number } }
) {
  switch (direction) {
    case Direction.Left:
      value.vec.x--;
      break;
    case Direction.Right:
      value.vec.x++;
      break;
    case Direction.Up:
      value.vec.y--;
      break;
    case Direction.Down:
      value.vec.y++;
      break;
    default:
      throw new Error('Invalid direction provided');
  }
  return value;
}

export const truncate = (
  str: string,
  length?: number,
  fromMiddle?: boolean
) => {
  const middle = fromMiddle ?? true;
  const len = length ?? 20;
  if (str.length <= len) {
    return str;
  }
  if (middle) {
    return `${str.slice(0, len / 2)}...${str.slice(-len / 2)}`;
  }
  return `${str.slice(0, len)}...`;
};

export const errorHandler = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  } else if (
    error &&
    typeof error === 'object' &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    return error.error;
  }
  return 'An error occurred';
};

export function deepMutable<T>(obj: T): DeepMutable<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepMutable(item)) as unknown as DeepMutable<T>;
  } else if (obj && typeof obj === 'object') {
    const result = {} as DeepMutableObject<T>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = deepMutable(obj[key]);
      }
    }
    return result as DeepMutable<T>;
  }
  return obj as DeepMutable<T>;
}
