// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// 第一次部署测试网的地址：0x036B06F83A7Ae0C0f05e035b23d09D4123B85ABe
// 我的代币（token）HF智能合约
contract HF_ERC20 {
  // 加public就能看到了（底层是生成一个同名函数）等同于function name() public view returns (string)
  string public name = "feihan token"; // 代币名称
  string public symbol = "HF"; // 代币的符号
  uint8 public decimals = 4; // 精度，代表一万个最小单位等于1HF

  mapping (address => uint256) public balanceOf; // 地址对应多少钱的映射记录，规范起名叫balanceOf

// 在合约部署的时候调用
  constructor(uint totalAmount){
    // 先把token都给部署者
    balanceOf[msg.sender] = totalAmount;
  }

  function transfer(address to, uint256 amount) public returns(bool){
    // 调用者只能是付出token的一方，不然恶意将别人的token转出就不对了
    address from = msg.sender;
    uint256 fromb = balanceOf[from];
    uint256 tob = balanceOf[to];

    balanceOf[from] = fromb - amount;
    balanceOf[to] = tob + amount;
    // 还有记录、日志等事情要做

    return true;
  }
}
