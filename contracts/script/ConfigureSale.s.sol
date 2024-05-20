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
    uint256 maxPerTransaction = vm.envUint("MAX_PER_TRANSACTION");
    uint256 unitPrice = vm.envUint("UNIT_PRICE");

    uint256 signerPrivateKey = vm.envUint("SIGNER_PRIVATE_KEY");
    address signerAddress = vm.addr(signerPrivateKey);

    minter.setSaleConfig(saleId, maxPerTransaction, unitPrice, signerAddress);

    vm.stopBroadcast();
  }
}

contract Public is Script {
  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    SignatureMinter minter = SignatureMinter(vm.envAddress("MINTER_CONTRACT_ADDRESS"));

    uint256 maxPerTransaction = vm.envUint("MAX_PER_TRANSACTION");
    uint256 unitPrice = vm.envUint("UNIT_PRICE");

    minter.setPublicSaleConfig(maxPerTransaction, unitPrice);

    vm.stopBroadcast();
  }
}
