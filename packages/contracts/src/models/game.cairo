use starknet::{ContractAddress,contract_address_to_felt252};

#[derive(Drop, Serde)]
#[dojo::model]
struct Game {
    #[key]
    game_id: felt252,
    game_start: u64,
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