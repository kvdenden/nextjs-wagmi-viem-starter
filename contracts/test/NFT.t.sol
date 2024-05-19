// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { NFT } from "../src/NFT.sol";

contract NFTTest is Test {
  NFT public nft;

  function setUp() public {
    nft = new NFT(address(this));
  }

  function test_Mint() public {
    address minter = vm.addr(0x111);
    address receiver = vm.addr(0x222);

    vm.expectRevert();
    vm.prank(minter);
    nft.mint(receiver, 1);

    nft.grantRole(nft.MINTER_ROLE(), minter);
    vm.prank(minter);
    uint256[] memory tokenIds = nft.mint(receiver, 1);

    assertEq(tokenIds.length, 1);
    assertEq(nft.balanceOf(receiver), 1);

    for (uint256 i; i < tokenIds.length; i++) {
      assertEq(nft.ownerOf(tokenIds[i]), receiver);
    }
  }
}
