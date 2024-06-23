<p align="center">
    <img src="./assets/logo-text.png" alt="StarkSketch Logo"  width="200px"/>
</p>

StarkSketch is a collaborative Sketching game built on Starknet using Dojo Game Engine. It is similar to the popular game Skribbl.io but with a twist.

In this version multiple users can join a room and sketch together. The game also allows users to mint their sketches as NFTs.

The game is built using Starknet, Dojo, and Liveblocks. The game allows users to create a room, invite friends, and sketch together. The game also allows users to mint their sketches as NFTs.

## How it works 🛠️

Users can create a room and invite friends to join the room, the room takes a word as input and the users have to sketch the word.

The word is stored as a pedersen hash of the actual `word` and `game_id`.

```
word_hash = pedersen_hash(word, game_id)
```

The game has a collaborative whiteboard using Excali Draw. Users can sketch on the whiteboard and other users can see the sketch in real-time.

Real time updates are handled using Liveblocks.

The game also allows users to mint their sketches as NFTs.

In the NFT page users can guess the word, users can provide the actual word and if the word is correct, a `500` Coin reward is given to the user.

Room Members can also save the state of the game to chain to maintain a history of the game.

Contracts are declared both on Starknet Sepolia and deployed Slot Instance. Here are the contracts:

```
Migration account: 0x6658135c023e062e0878cc81e40e207b5b12857d31823b48b4bfb35cdf1349e

World name: starksketch

Chain ID: SN_SEPOLIA

[1] 🌎 Building World state....
  > No remote World found
[2] 🧰 Evaluating Worlds diff....
  > Total diffs found: 9
[3] 📦 Preparing for migration....
  > Total items to be migrated (9): New 9 Update 0
[4] 🛠 Migrating....

# Base Contract
  > Already declared: 0x22f3e55b61d86c2ac5239fa3b3b8761f26b9a5c0b5f61ddbd5d756ced498b46
# World
  > Contract address: 0x6fa7fa3957de2627d47b860075884c01f45c62461579f4881eee6ab5a9e87bd
# Models (7)
starksketch::models::coin::coin_balance
  > Already declared: 0x57263831cb322493af533120e82ed7cc70cba80629b25dcb188dddd9b3c9338
starksketch::models::game::game
  > Already declared: 0x146e3b674cc345092643f65caa2527f361868c1831d97b79023064f26aeca3d
starksketch::models::game::player
  > Already declared: 0x6de731f836136b44811ab8f21de43c8959ebe13b8533d45608633bc889482b6
starksketch::models::game::rewards
  > Already declared: 0x2fe1f5ec00e6732e15fba978b5075e1df7547ff274d9869de5317d6d0558e35
starksketch::models::token::erc_721_balance
  > Already declared: 0x5217c2ae318ce72b92d042acc9614dcc91b738425f2c0a26201ce59e7bb8c89
starksketch::models::token::erc_721_meta
  > Already declared: 0x9e63aa446d750e9a2846b99f564e141e94399b8681657a91ca80ccd1d7c54
starksketch::models::token::erc_721_owner
  > Already declared: 0x68967d4a73c14075b3a092a9c9c4bdcba7231c3f921890c5102114914e1584b
All models are registered at: 0x144401b178ac0283f391e6a16f8308613a4656d216c249de025ff7f301b6c3d
# Contracts (1)
starksketch::systems::actions::actions
  > Contract address: 0x2077fbbcb892c6785c7ca111da872905a3e4b3340541492e10b810ef154121b

🎉 Successfully migrated World at address 0x6fa7fa3957de2627d47b860075884c01f45c62461579f4881eee6ab5a9e87bd

[5] ✨ Updating manifests....

✨ Done.

[6] 🖋️ Authorizing Models to Systems (based on overlay)....

  > Authorizing starksketch::systems::actions::actions for Models: []
  > Auto authorize completed successfully

[7] 🌐 Uploading metadata....

  > starksketch::models::token::erc_721_meta: ipfs://QmWoPbZvRcLDRQFq2yzm8mTxgZBWzvMPXBBQ42Mp6LzQHD
  > starksketch::models::coin::coin_balance: ipfs://QmZSgkRCx5sT9t4SRQyyk7ZkoVyHxTBvGbEHNNHdHuVr4Q
  > starksketch::models::game::player: ipfs://QmQAiZkXxonMS5VDNWEP5Kbti6Uv7AqgbCMnSGoR6Z8CCN
  > starksketch::models::game::rewards: ipfs://QmRBu8HhkPc7iJt8CR6E5f5fFNGcae3EDrtLv59Dh9U985
  > starksketch::models::token::erc_721_balance: ipfs://QmTvBrwkfTdLf3fv4C7mwhQePfjyDDDsbBMBb2gx8c1NBp
  > starksketch::systems::actions::actions: ipfs://QmPYpG8oDq4oYcVh1ueybuCqE6zSnSC1EJ5hSD9SWQTVwz
  > starksketch::models::token::erc_721_owner: ipfs://QmUBCqddWLYrE2Z6Q7Agw3cb4Z9dDY1o7KsWr7aLt3BXkT
  > starksketch::models::game::game: ipfs://QmTZFvUY8eEBjNvgQXr8Z6PNXvgY42eqfZvHo3Wu87ZrKG
> All IPFS artifacts have been successfully uploaded.
> All metadata have been registered in the resource registry (tx hash: 0x6b8444133d2bb8fda2e470f123d3e627937332edf124b7501a0782a789f1f90)

✨ Done.
```


And these are the Deployed Slot Instances

```
SLOT TORII URL: https://api.cartridge.gg/x/starksketch-katana-torii/torii
SLOT KATANA URL: https://api.cartridge.gg/x/starksketch-katana/katana

SLOT SEPOLIA TORII URL: https://api.cartridge.gg/x/starksketch-sepolia-torii/torii
```

## Demo Video 🎥

[![Demo Video](https://img.youtube.com/vi/kWUuFL6UUZc/0.jpg)](https://www.youtube.com/watch?v=kWUuFL6UUZc)

https://youtu.be/kWUuFL6UUZc

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/1.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/2.png" alt="Create Game" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/3.png" alt="Collaborative Whiteboard" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/4.png" alt="Save State" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/5.png" alt="NFTs" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/6.png" alt="NFT Page" >
    </td>
  </tr>
</table>

## 🧑🏼‍💻 Tech Stack

- **Frontend**: Vite, Tailwind CSS, shadcn
- **Integration**: `Liveblocks`, `Dojo.js`, `Excali Draw`
- **Contracts**: Dojo, Cairo

## Get Started 🚀

The following repository is a turborepo and divided into the following:

- **apps/www** - The web application built using Vite.

First install the dependencies by running the following:

```
pnpm install
```

Then fill in the Environment variables in `apps/www/.env.local`

```env
VITE_DYNAMIC_ENV_ID="dynamic_wallet_environment_id"
VITE_LIVEBLOCKS_API_KEY="liveblocks_api_key"

# Dojo Config
VITE_CHAIN="KATANA" # "KATANA" or "SN_SEPOLIA"
VITE_RPC_URL="http://localhost:5050"
VITE_TORII_URL="http://localhost:8080"


# (Optional) Only for Katana Deployments
VITE_MASTER_ADDRESS=""
VITE_MASTER_PRIVATE_KEY=""
```

For Local Deployment, you can use the following configuration:

```env
VITE_CHAIN="KATANA"
VITE_RPC_URL="http://localhost:5050"
VITE_TORII_URL="http://localhost:8080"
```

To run local katana and torii, in a new terminal run the following:

```bash
pnpm run pre-dev
```

This will start the Katana and Torii servers and migrate the contracts.

Finally, run the following command to start the application:

```bash
pnpm dev
```

---

This project was built during the [StarkHacks Hackathon](https://ethglobal.com/events/starkhack).
