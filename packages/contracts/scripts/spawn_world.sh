#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050";

# export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

# sozo execute --world <WORLD_ADDRESS> <CONTRACT> <ENTRYPOINT>
sozo execute --world 0x6fa7fa3957de2627d47b860075884c01f45c62461579f4881eee6ab5a9e87bd starksketch::systems::actions::actions spawn_game -c 0x1,0x2 --wait
