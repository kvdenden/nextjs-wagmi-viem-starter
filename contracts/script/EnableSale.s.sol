// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Script, console2 } from "forge-std/Script.sol";

import { SignatureMinter } from "../src/SignatureMinter.sol";

contract Allowlist is Script {
  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    SignatureMinter minter = SignatureMinter(vm.envAddress("MINTER_CONTRACT_ADDRESS"));

    uint256 saleId = vm.envUint("SALE_ID");
    minter.setSaleStatus(saleId, true);

    vm.stopBroadcast();
  }
}

contract Public is Script {
  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    SignatureMinter minter = SignatureMinter(vm.envAddress("MINTER_CONTRACT_ADDRESS"));

    minter.setPublicSaleStatus(true);

    vm.stopBroadcast();
  }
}
