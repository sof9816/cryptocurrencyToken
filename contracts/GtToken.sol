// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GtToken {

    string public name = 'Gt Token'; // this is erc-20 but optional
    string public symbol = 'GT'; // this is erc-20 but optional
    string public standard = 'GT Token v1.0'; // this is not erc-20, just a personal preferance
    uint256 public totalSupply;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    
    constructor() public {
        balanceOf[msg.sender] = 1000000;
        totalSupply = 1000000;
        // allocate the initial supply
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
