// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Name{}

// 可以接收NFT的合约
abstract contract ReceiveNFT is IERC721Receiver,Ownable{
    function transfer(address _nft, address _to, uint256 _tokenId) public onlyOwner{
        IERC721(_nft).safeTransferFrom(address(this), _to, _tokenId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure returns (bytes4){
        require(from == address(0), "address from = zero address");
        return IERC721Receiver.onERC721Received.selector;
    }
}