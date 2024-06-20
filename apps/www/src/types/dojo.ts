import { type Account, type AccountInterface } from 'starknet';

export interface AccountProps {
  account: Account | AccountInterface;
}
export interface SpawnGameProps extends AccountProps {
  gameId: string;
  wordHash: string;
}

export interface JoinGameProps extends AccountProps {
  gameId: string;
}

export interface UpdateBoardProps extends AccountProps {
  gameId: string;
  boardId: string;
}
