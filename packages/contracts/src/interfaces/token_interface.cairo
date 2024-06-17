use starknet::ContractAddress;

use oasis::models::token::{ERC721Owner,ERC721Balance,ERC721Meta};

#[dojo::interface]
trait ERC721ABI<T> {
    fn initialize(ref world: IWorldDispatcher);

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