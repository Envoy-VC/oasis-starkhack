import { type Account, type AccountInterface } from 'starknet';

export interface AccountProps {
  account: Account | AccountInterface;
}
export interface SpawnGameProps extends AccountProps {
  game_id: string;
  word_hash: string;
}
