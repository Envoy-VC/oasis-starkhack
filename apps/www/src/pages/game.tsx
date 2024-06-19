import { useSearchParams } from 'react-router-dom';

import { Room, Whiteboard } from '~/components';

const GamePage = () => {
  const [searchParams] = useSearchParams();

  const gameID = searchParams.get('id');

  // TODO: Conditional check for gameID and player address

  if (!gameID) {
    return <div>Game ID is required</div>;
  }

  return (
    <Room id={gameID}>
      <Whiteboard gameID={gameID} />
    </Room>
  );
};

export default GamePage;
