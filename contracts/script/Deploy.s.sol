// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Script, console } from "forge-std/Script.sol";

import { NFT } from "../src/NFT.sol";
import { TokenRenderer } from "../src/TokenRenderer.sol";
import { SignatureMinter } from "../src/SignatureMinter.sol";

contract Deploy is Script {
  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address deployer = vm.addr(deployerPrivateKey);

    vm.startBroadcast(deployerPrivateKey);

    NFT nft = new NFT(deployer);
    console.log("NFT deployed at address: ", address(nft));

    string memory baseURI = vm.envString("BASE_URI");
    TokenRenderer renderer = new TokenRenderer(baseURI, deployer);
    console.log("TokenRenderer deployed at address: ", address(renderer));

    nft.setRenderer(address(renderer));

    SignatureMinter minter = new SignatureMinter(address(nft), deployer);
    console.log("SignatureMinter deployed at address: ", address(minter));

    uint256 mintSupply = vm.envUint("MINTER_SUPPLY");
    minter.setMintSupply(mintSupply);

    nft.grantRole(nft.MINTER_ROLE(), address(minter));
  }
}
