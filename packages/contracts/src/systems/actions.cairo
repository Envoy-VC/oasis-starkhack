use oasis::models::game::Game;
use dojo::base::base::{ContractState,IWorldDispatcher};
use core::zeroable::Zeroable;

#[dojo::interface]
trait IGameActions<T> {
    fn spawn_game(ref world: IWorldDispatcher, start_time: u64);
    fn join_game(ref world: IWorldDispatcher, game_id: felt252);
    fn update_board(ref world: IWorldDispatcher, game_id: felt252, board_id: felt252);
}

#[dojo::contract]
mod actions {
    use core::zeroable::Zeroable;
    use starknet::contract_address::ContractAddressZero;
    use starknet::{
        ContractAddress,
        get_caller_address,
        get_block_timestamp,
        contract_address_to_felt252,
        get_contract_address
    };
    use super::IGameActions;

    use oasis::models::game::{Game,Player};
    use oasis::models::token::{ERC721Meta,ERC721Balance,ERC721Owner};
    use oasis::interfaces::token_interface::ERC721ABI;

    // Game Actions
    #[abi(embed_v0)]
    impl GameActionsImpl of IGameActions<ContractState> {
        fn spawn_game(ref world: IWorldDispatcher, start_time: u64) {
            let caller = get_caller_address();
            let start: felt252 = start_time.into();
            let game_id = pedersen::pedersen(caller.into(), start);

            let player_1 = Player { address: caller, board_id: 0 ,game_id};
            let default_player = Player { 
                address: ContractAddressZero::zero(),
                board_id: 0,
                game_id,
            };

            let game = Game {
                game_id: game_id,
                game_start: start_time,
                player_1,
                player_2: default_player,
                player_3: default_player,
                player_4: default_player,
                total_players: 1,
            };

            set!(world,(game));
        }
        fn join_game(ref world: IWorldDispatcher, game_id: felt252) {
            let caller = get_caller_address();
            let mut game: Game = get!(world, game_id, (Game));
            let player = Player { address: caller, board_id: 0, game_id };

            if(game.total_players == 4) {
                return;
            }

            if game.total_players == 1 {
                game.player_2 = player;
                game.total_players += 1;
            } else if game.total_players == 2 {
                game.player_3 = player;
                game.total_players += 1;
            } else if game.total_players == 3 {
                game.player_4 = player;
                game.total_players += 1;
            }

            set!(world,(game));
        }
        fn update_board(ref world: IWorldDispatcher, game_id: felt252, board_id: felt252) {
            let caller = get_caller_address();
            let mut player: Player = get!(world, (caller, game_id), (Player));
            player.board_id = board_id;
            set!(world,(player));
        }
    }

    // Token Actions
    #[abi(embed_v0)]
    impl ERC721 of ERC721ABI<ContractState> {
        fn initialize (ref world: IWorldDispatcher) {
            let meta = ERC721Meta { token: get_contract_address(), name: 'Oasis', symbol: 'OASIS' };
            set!(world, (meta));
        }

        fn meta(ref world: IWorldDispatcher) -> ERC721Meta {
            let token = get_contract_address();
            get!(world, token, (ERC721Meta))
        }

        fn name(ref world: IWorldDispatcher) -> felt252 {
            let token = get_contract_address();
            let meta: ERC721Meta = get!(world, token, (ERC721Meta));
            meta.name
        }

        fn symbol(ref world: IWorldDispatcher) -> felt252 {
            let token = get_contract_address();
            let meta: ERC721Meta = get!(world, token, (ERC721Meta));
            meta.symbol
        }

        fn balance_of(ref world: IWorldDispatcher, account: ContractAddress) -> ERC721Balance {
            let token = get_contract_address();
            let balance: ERC721Balance = get!(world, (account, token), (ERC721Balance));
            balance
        }

        fn owner_of(ref world: IWorldDispatcher, token_id: felt252) -> ERC721Owner {
            let token = get_contract_address();
            let owner: ERC721Owner =  get!(world, (token_id, token), (ERC721Owner));
            owner
        }

        fn token_uri(ref world: IWorldDispatcher, token_id: felt252) -> felt252 {
            let token = get_contract_address();
            let owner: ERC721Owner = get!(world, (token_id, token), (ERC721Owner));
            owner.token_uri
        }

       fn mint(
            ref world: IWorldDispatcher, 
            address: ContractAddress, 
            token_id: felt252, 
            token_uri: felt252
        ) {
            let token = get_contract_address();
            // check if token exists
            let owner: ERC721Owner = get!(world, (token_id, token), (ERC721Owner));
            if owner.address != ContractAddressZero::zero() {
                return;
            }
            let owner = ERC721Owner { address, token_uri, token, token_id };
            let mut balance: ERC721Balance = get!(world, (token, address), (ERC721Balance));
            balance.amount += 1;

            set!(world, (owner));
            set!(world, (balance));
        }
    }
}