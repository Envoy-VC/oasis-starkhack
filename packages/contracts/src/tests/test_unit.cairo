#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo::test_utils::get_caller_address;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    use starksketch::{
        systems::{actions::{actions,IActionsDispatcher,IActionsDispatcherTrait,ERC721ABIDispatcher,ERC721ABIDispatcherTrait}},
        models::{
            game::{Game, Player, Rewards, game},
            coin::{CoinBalance,coin_balance},
            token::{ERC721Balance, ERC721Meta, ERC721Owner,erc_721_balance,erc_721_meta,erc_721_owner}
        }
    };

    use starknet::testing::{set_caller_address};
    use starknet::{contract_address_to_felt252,get_contract_address};

    // helper setup function
    #[test]
    fn setup_world() -> (IWorldDispatcher, IActionsDispatcher, ERC721ABIDispatcher) {
        let mut models = array![
            game::TEST_CLASS_HASH,
            coin_balance::TEST_CLASS_HASH,
            erc_721_balance::TEST_CLASS_HASH,
            erc_721_meta::TEST_CLASS_HASH,
            erc_721_owner::TEST_CLASS_HASH
        ];
        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let game_actions = IActionsDispatcher { contract_address };
        let erc721_actions = ERC721ABIDispatcher { contract_address };

        (world, game_actions, erc721_actions)
    }


    #[test]
    fn test_spawn() {
        let (world, game_actions, _erc721_actions) = setup_world();
        let game_id = 1;
        let word_hash = 2;

        //system calls
        game_actions.spawn_game(game_id, word_hash);
        
        //get game
        let game: Game = get!(world, game_id, (Game));
        assert!(game.word_hash == word_hash, "should have word hash ");
        assert!(game.game_id == game_id, "should have game id");
    }

    #[test]
    fn test_mint() {
        let (world, _game_actions, erc721_actions) = setup_world();
        let caller = get_caller_address();
        let token_id = 1;
        let game_id = 1;
        let token_uri = "QmTVkWpG2unQBi194MtrdFcNsNH6hdJ3izcsRVRsAeKxRr";

        //system calls
        erc721_actions.mint(token_id, game_id, token_uri);

        let owner: ERC721Owner = get!(world, (token_id, game_id), (ERC721Owner));
        let balance: ERC721Balance = get!(world, (caller), (ERC721Balance));

        // print!("Token URI: {:?}", owner.token_uri);
        assert!(owner.address == caller, "should have caller as owner");
        assert!(balance.amount == 1, "should have 1 token");
    }
    #[test]
    fn test_guess_corret_word() {
        let (world, game_actions, _erc721_actions) = setup_world();

        let caller = get_caller_address();
        let game_id = 1;
        let word = 2;
        let word_hash = core::pedersen::pedersen(game_id, word);

        //system calls
        game_actions.spawn_game(game_id, word_hash);
        game_actions.guess_word(game_id, word);

        let mut rewards: Rewards = get!(world, (caller,game_id), (Rewards));
        let coin: CoinBalance = get!(world, caller, (CoinBalance));

        assert!(rewards.claimed == true, "should have claimed rewards");
        assert!(coin.balance == 500, "should have 100 coins");
    }

    #[test]
    fn test_guess_wrong_word() {
        let (world, game_actions, _erc721_actions) = setup_world();

        let caller = get_caller_address();
        let game_id = 1;
        let word = 2;
        let word_hash = core::pedersen::pedersen(game_id, word);

        //system calls
        game_actions.spawn_game(game_id, word_hash);
        game_actions.guess_word(game_id, 3);

        let mut rewards: Rewards = get!(world, (caller,game_id), (Rewards));
        let coin: CoinBalance = get!(world, caller, (CoinBalance));

        assert!(rewards.claimed == false, "should not have claimed rewards");
        assert!(coin.balance == 0, "should have 0 coins");
    }

     #[test]
     #[should_panic]
    fn test_panic_double_guess() {
        let (_world, game_actions, _erc721_actions) = setup_world();
        let game_id = 1;
        let word = 2;
        let word_hash = core::pedersen::pedersen(game_id, word);

        //system calls
        game_actions.spawn_game(game_id, word_hash);
        game_actions.guess_word(game_id, word);
        game_actions.guess_word(game_id, word);
    }
}