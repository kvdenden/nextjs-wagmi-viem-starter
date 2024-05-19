// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

import { IMintableERC721 } from "./interfaces/IMintableERC721.sol";
import { ITokenRenderer } from "./interfaces/ITokenRenderer.sol";
import { Utils } from "./lib/Utils.sol";

contract NFT is ERC721, AccessControl, IMintableERC721 {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  address public renderer;

  uint256 private _mintCounter;

  constructor(address owner) ERC721("Non Fungible Token", "NFT") {
    _grantRole(DEFAULT_ADMIN_ROLE, owner);
  }

  function mint(address to, uint256 quantity)
    external
    onlyRole(MINTER_ROLE)
    returns (uint256[] memory)
  {
    uint256 startTokenId = _mintCounter;
    require(startTokenId + quantity <= _maxSupply(), "Exceeds max supply");

    for (uint256 i; i < quantity; i++) {
      _mint(to, startTokenId + i);
    }
    _mintCounter += quantity;

    return Utils.range(startTokenId, quantity);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721) returns (string memory) {
    _requireOwned(tokenId);

    return ITokenRenderer(renderer).tokenURI(tokenId);
  }

  function totalSupply() public view virtual override returns (uint256) {
    return _mintCounter;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, AccessControl, IERC165)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function setRenderer(address renderer_) external onlyRole(DEFAULT_ADMIN_ROLE) {
    renderer = renderer_;
  }

  function _maxSupply() internal view virtual returns (uint256) {
    return type(uint256).max;
  }
}
