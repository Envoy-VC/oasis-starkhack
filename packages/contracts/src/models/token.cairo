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
#[derive(Copy, Drop, Serde)]
struct ERC721Owner {
    #[key]
    token: ContractAddress,
    #[key]
    token_id: felt252,
    token_uri: felt252,
    address: ContractAddress
}

#[dojo::model]
#[derive(Model, Copy, Drop, Serde)]
struct ERC721Balance {
    #[key]
    token: ContractAddress,
    #[key]
    account: ContractAddress,
    amount: u256,
}