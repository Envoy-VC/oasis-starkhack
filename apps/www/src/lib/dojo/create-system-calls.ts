import { type ClientComponents } from './create-client-components';
import { type ContractComponents } from './generated/contract-components';
import type { IWorld } from './generated/generated';

import type { SpawnGameProps } from '~/types/dojo';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  _contractComponents: ContractComponents,
  { Game, Player, ERC721Balance, ERC721Owner }: ClientComponents
) {
  const spawnWorld = async ({
    account,
    game_id,
    word_hash,
  }: SpawnGameProps) => {
    try {
      const res = await client.actions.spawnGame({
        account,
        game_id,
        word_hash,
      });
      console.log(
        await account.waitForTransaction(res.transaction_hash, {
          retryInterval: 100,
        })
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    spawnWorld,
  };
}
