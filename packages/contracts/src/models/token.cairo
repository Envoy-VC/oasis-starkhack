use starknet::ContractAddress;

#[dojo::model]
#[derive(Copy, Drop, Serde)]
struct ERC721Meta {
    #[key]
    token: ContractAddress,
    name: felt252,
    symbol: felt252,
}

#[dojo::model]
#[derive(Drop, Serde)]
struct ERC721Owner {
    #[key]
    token_id: felt252,
    #[key]
    game_id: felt252,
    token_uri: ByteArray,
    address: ContractAddress
}

#[dojo::model]
#[derive(Model, Copy, Drop, Serde)]
struct ERC721Balance {
    #[key]
    account: ContractAddress,
    amount: u256,
}


// Events

#[event]
#[derive(Drop, starknet::Event)]
enum ERC721Events {
    TokenMinted: TokenMinted,
}

#[derive(Drop, Serde, starknet::Event)]
struct TokenMinted {
    #[key]
    token_id: felt252,
    #[key]
    game_id: felt252,
    owner: ContractAddress
}