#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use dojo::test_utils::{spawn_test_world, deploy_contract};
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
    use starknet::{get_caller_address,contract_address_to_felt252,get_contract_address};

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
    fn test_meta() {
        let (world, game_actions, erc721_actions) = setup_world();
        let meta: ERC721Meta = get!(world,get_contract_address() , (ERC721Meta));
        println!("name: {:?}", meta.name);
        println!("symbol: {:?}", meta.symbol);
        
    }
}