mod systems {
    mod actions;
}

mod models {
    mod game;
    mod token;
}

mod interfaces {
    mod token_interface;
}

mod tests {}


// fn mint(
        //     ref world: IWorldDispatcher, 
        //     address: ContractAddress, 
        //     token_id: felt252, 
        //     token_uri: felt252
        // ) {
        //     let token = get_contract_address();
        //     // let owner: ContractAddress = get!(world, (token_id, addr), (ERC721Owner)).address;
        //     // assert!(owner == ContractAddressZero::zero(), "Token already exists");
        //     let owner = ERC721Owner { address, token_uri, token, token_id };
        // }

        // // fn token_exists(ref world: IWorldDispatcher, token_id: felt252) -> bool {
        // //     let addr = get_contract_address();
        // //     let owner: ContractAddress = get!(world, (token_id, addr), (ERC721Owner)).address;
        // //     owner != ContractAddressZero::zero()
        // // }