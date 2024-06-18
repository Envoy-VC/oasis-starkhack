use starknet::ContractAddress;

#[dojo::model]
#[derive(Copy, Drop, Serde)]
struct CoinBalance {
    #[key]
    address: ContractAddress,
    balance: u128,
}