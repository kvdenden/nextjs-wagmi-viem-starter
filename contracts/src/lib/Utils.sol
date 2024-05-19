// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library Utils {
    function range(uint256 from, uint256 length) internal pure returns (uint256[] memory result) {
        result = new uint256[](length);
        for (uint256 i; i < length; i++) {
            result[i] = from + i;
        }
    }
}
