use starknet::{ContractAddress,contract_address_to_felt252};

#[derive(Drop, Serde)]
#[dojo::model]
struct Game {
    #[key]
    game_id: felt252,
    word_hash: felt252,
    player_1: Player,
    player_2: Player,
    player_3: Player,
    player_4: Player,
    total_players: felt252,
}

#[derive(Drop, Serde, Copy)]
#[dojo::model]
struct Player {
    #[key]
    address: ContractAddress,
    #[key]
    game_id: felt252,
    board_id: felt252,
}

#[derive(Drop, Serde, Copy)]
#[dojo::model]
struct Rewards {
    #[key]
    address: ContractAddress,
    #[key]
    game_id: felt252,
    claimed: bool,
}