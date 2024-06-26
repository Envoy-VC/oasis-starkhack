import { useSearchParams } from 'react-router-dom';

import { useAccount, useDojo } from '~/lib/hooks';

import { getComponentValue } from '@dojoengine/recs';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { Room, Whiteboard } from '~/components';

const GamePage = () => {
  const [searchParams] = useSearchParams();
  const {
    clientComponents: { Player },
  } = useDojo();

  const { account } = useAccount();

  if (!account) {
    return <div>Connect your wallet to join a game.</div>;
  }

  const gameID = searchParams.get('id');

  if (!gameID) {
    return <div>Game ID is required</div>;
  }

  const playerEntity = getEntityIdFromKeys([
    BigInt(account.address),
    BigInt(`0x${Buffer.from(gameID).toString('hex')}`),
  ]);

  const player = getComponentValue(Player, playerEntity);

  console.log('player', player);

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <Room id={gameID}>
      <Whiteboard gameID={gameID} />
    </Room>
  );
};

export default GamePage;
