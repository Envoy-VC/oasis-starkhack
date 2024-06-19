import { useDojo } from '~/lib/hooks';

import { Button } from '~/components/ui/button';

const Home = () => {
  const {
    setup: {
      systemCalls: { spawnWorld },
      masterAccount,
    },
  } = useDojo();
  return (
    <div>
      <Button
        onClick={() => {
          void spawnWorld({
            account: masterAccount,
            gameId: '1',
            wordHash: '2',
          });
        }}
      >
        Spawn Game
      </Button>
    </div>
  );
};

export default Home;
