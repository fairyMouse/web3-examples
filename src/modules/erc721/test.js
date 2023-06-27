const { keccak256 } = require('ethers');
const { MerkleTree } = require('merkletreejs');

const white = [
  '0x4614277c6e745bF5Baf6ca9F87E2F0d0f96a7030',
  '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
  '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
];
// 生成MerkleTree
const leaf = white.map(x => keccak256(x));
const markletree = new MerkleTree(leaf, keccak256, { sortPairs: true });
const root = markletree.getHexRoot();

console.log('root:', root); // 0x95ec69f38444bdaf9663131a1437bc7b74a800d640db2fb28bce86511e05f917
const proof = markletree.getHexProof(leaf[1]);
console.log('proof:', proof);
