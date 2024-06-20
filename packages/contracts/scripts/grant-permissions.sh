#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export ACTIONS="0x2077fbbcb892c6785c7ca111da872905a3e4b3340541492e10b810ef154121b"

sozo auth grant writer Game,$ACTIONS
sozo auth grant writer Player,$ACTIONS
sozo auth grant writer Rewards,$ACTIONS
sozo auth grant writer CoinBalance,$ACTIONS
sozo auth grant writer ERC721Owner,$ACTIONS
sozo auth grant writer ERC721Balance,$ACTIONS