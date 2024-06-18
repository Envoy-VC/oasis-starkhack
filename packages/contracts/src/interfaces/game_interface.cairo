use dojo::base::base::{IWorldDispatcher};

#[dojo::interface]
trait IGameActions<T> {
    fn spawn_game(ref world: IWorldDispatcher, game_id: felt252, word_hash: felt252);
    fn join_game(ref world: IWorldDispatcher, game_id: felt252);
    fn update_board(ref world: IWorldDispatcher, game_id: felt252, board_id: felt252);
    fn guess_word(ref world: IWorldDispatcher, game_id: felt252, word: felt252);
}