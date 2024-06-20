use starknet::{ContractAddress,contract_address_to_felt252};

#[derive(Drop, Serde, PartialEq,PartialOrd)]
#[dojo::model]
struct Game {
    #[key]
    game_id: felt252,
    word_hash: felt252,
}

#[derive(Drop, Serde, Copy, Display)]
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
