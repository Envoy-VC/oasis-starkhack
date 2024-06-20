use starknet::{ContractAddress,contract_address_to_felt252};

#[derive(Drop, Serde, PartialEq,PartialOrd)]
#[dojo::model]
struct Game {
    #[key]
    game_id: felt252,
    word_hash: felt252,
}

#[derive(Drop, Serde, Display)]
#[dojo::model]
struct Player {
    #[key]
    address: ContractAddress,
    #[key]
    game_id: felt252,
    board_id: ByteArray,
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

// Events

#[event]
#[derive(Drop, starknet::Event)]
enum GameEvents {
    GameSpawned: GameSpawned,
    PlayerJoined: PlayerJoined,
    BoardUpdated: BoardUpdated,
    RewardsClaimed: RewardsClaimed,
}

#[derive(Drop, Serde, starknet::Event)]
struct GameSpawned {
    #[key]
    game_id: felt252,
}

#[derive(Drop, Serde, starknet::Event)]
struct PlayerJoined {
    #[key]
    game_id: felt252,
    #[key]
    player: ContractAddress,
}

#[derive(Drop, Serde, starknet::Event)]
struct BoardUpdated {
    #[key]
    game_id: felt252,
    #[key]
    player: ContractAddress,
}

#[derive(Drop, Serde, starknet::Event)]
struct RewardsClaimed {
    #[key]
    game_id: felt252,
    #[key]
    player: ContractAddress,
}
