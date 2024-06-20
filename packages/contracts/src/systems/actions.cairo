use dojo::base::base::{ContractState,IWorldDispatcher};
use starksketch::models::token::{ERC721Owner,ERC721Balance,ERC721Meta};
use starknet::account::ContractAddress;

#[dojo::interface]
trait IActions<T> {
    fn spawn_game(ref world: IWorldDispatcher, game_id: felt252, word_hash: felt252);
    fn join_game(ref world: IWorldDispatcher, game_id: felt252);
    fn update_board(ref world: IWorldDispatcher, game_id: felt252, board_id: felt252);
    fn guess_word(ref world: IWorldDispatcher, game_id: felt252, word: felt252);
}

#[dojo::interface]
trait ERC721ABI<T> {
    // Metadata
    fn meta(ref world: IWorldDispatcher) -> ERC721Meta;
    fn name(ref world: IWorldDispatcher) -> felt252;
    fn symbol(ref world: IWorldDispatcher) -> felt252;

    // Read Methods
    fn balance_of(ref world: IWorldDispatcher, account: ContractAddress) -> ERC721Balance;
    fn owner_of(ref world: IWorldDispatcher, token_id: felt252) -> ERC721Owner;
    fn token_uri(ref world: IWorldDispatcher, token_id: felt252) -> felt252;
    // fn token_exists(ref world: IWorldDispatcher, token_id: felt252) -> bool;

    // Write Methods
    fn mint(
        ref world: IWorldDispatcher, 
        address: ContractAddress, 
        token_id: felt252, 
        token_uri: felt252
    ); 
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

    use starksketch::models::game::{Game,Player,Rewards};
    use starksketch::models::coin::CoinBalance;
    use starksketch::models::token::{ERC721Meta,ERC721Balance,ERC721Owner};

    use super::{IActions,ERC721ABI};

    #[constructor]
    fn constructor(ref self: ContractState, ref world: IWorldDispatcher) {
        let meta = ERC721Meta { 
            token: get_contract_address(), 
            name: 'StarkSketch', 
            symbol: 'SKETCH' 
        };
        set!(world, (meta));
    }

    // Game Actions
    #[abi(embed_v0)]
    impl GameActionsImpl of IActions<ContractState> {
        fn spawn_game(ref world: IWorldDispatcher, game_id: felt252, word_hash: felt252) {
            let caller = get_caller_address();
            let player = Player { address: caller, board_id: 1 , game_id };
            let game = Game {
                game_id: game_id,
                word_hash,
            };
            set!(world,(game));
            set!(world,(player));
        }
        fn join_game(ref world: IWorldDispatcher, game_id: felt252) {
            let caller = get_caller_address();
            let  old: Player = get!(world, (caller, game_id), (Player));

            if(old.board_id != 0) {
                panic!("Player already joined a board");
            }

            let player = Player { address: caller, board_id: 1, game_id };
            set!(world,(player));
        }
        fn update_board(ref world: IWorldDispatcher, game_id: felt252, board_id: felt252) {
            let caller = get_caller_address();
            let mut player: Player = get!(world, (caller, game_id), (Player));

            if(player.board_id == 0) {
                panic!("Player has not joined a board yet");
            }

            player.board_id = board_id;
            set!(world,(player));
        }

        fn guess_word(ref world: IWorldDispatcher, game_id: felt252, word: felt252) {
            let caller = get_caller_address();
            let game: Game = get!(world, game_id, (Game));

            let hash = core::pedersen::pedersen(game_id, word);
            let mut rewards: Rewards = get!(world, (caller,game_id), (Rewards));

            if(rewards.claimed) {
                panic!("Rewards already claimed");
            }

            rewards.claimed = true;

            if hash == game.word_hash {
                let mut coin_balance: CoinBalance = get!(world, caller, (CoinBalance));
                coin_balance.balance += 500;
                set!(world,(coin_balance));
                set!(world,(rewards));
            }
        }
    }

    // Token Actions
    #[abi(embed_v0)]
    impl ERC721 of ERC721ABI<ContractState> {
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