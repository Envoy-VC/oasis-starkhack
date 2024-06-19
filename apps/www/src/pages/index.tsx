import { useDojo } from '~/lib/dojo/useDojo';

import { Button } from '~/components/ui/button';

const Home = () => {
  const {
    setup: {
      systemCalls: { spawnWorld },
      clientComponents,
      masterAccount,
    },
    account,
  } = useDojo();
  return (
    <div>
      <Button
        onClick={() => {
          spawnWorld({ account: masterAccount, game_id: '1', word_hash: '2' });
        }}
      >
        Spawn Game
      </Button>
      <Button
        onClick={() => {
          account.create();
          console.log(account.account);
        }}
      >
        Create Burner
      </Button>
    </div>
  );
};

export default Home;
