/* Autogenerated file. Do not edit manually. */
import { type DojoProvider } from '@dojoengine/core';

import { type SpawnGameProps } from '~/types/dojo';

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export function setupWorld(provider: DojoProvider) {
  const actions = {
    spawnGame: async ({ account, startTime }: SpawnGameProps) => {
      try {
        return await provider.execute(account, {
          contractName: 'actions',
          entrypoint: 'spawn_game',
          calldata: [startTime],
        });
      } catch (error) {
        console.error('Error executing spawnGame:', error);
        throw error;
      }
    },
  };
  return {
    actions,
  };
}
