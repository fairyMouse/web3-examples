// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Name{}

// 可以接收NFT的合约
contract ReceiveNFT is IERC721Receiver,Ownable{
    /**
     * transfer
     * @param _nft nft的合约地址
     * @param _to 转出地址
     * @param _tokenId  nft的id
     */
    function transfer(address _nft, address _to, uint256 _tokenId) public onlyOwner{
        IERC721(_nft).safeTransferFrom(address(this), _to, _tokenId);
    }

// 实现onERC721Received接口只是表明合约打算处理ERC721代币，具体是否能处理还得看代码，当前合约的transfer就是实现对NFT的处理
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