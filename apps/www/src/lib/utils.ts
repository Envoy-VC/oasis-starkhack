import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type DeepMutable, type DeepMutableObject } from '~/types/liveblocks';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
        // Cast the key to keyof T and use it to access both obj and result
        (result as any)[key] = deepMutable((obj as any)[key]);
      }
    }
    return result as DeepMutable<T>;
  }
  return obj as DeepMutable<T>;
}
