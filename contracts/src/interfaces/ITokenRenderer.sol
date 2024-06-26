// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ITokenRenderer {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
