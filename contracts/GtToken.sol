// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GtToken {
  string public name = "Gt Token"; // this is erc-20 but optional
  string public symbol = "GT"; // this is erc-20 but optional
  string public standard = "GT Token v1.0"; // this is not erc-20, just a personal preferance
  uint256 public totalSupply;

  // Transfer event, erc-20 std
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  // Approval event, erc-20 std
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

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

  function approve(address _spender, uint256 _value)
    public
    returns (bool success)
  {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public returns (bool success) {
    // require from account has enough tokens
    require(_value <= balanceOf[_from], "value is bigger than the balance of sender");
    // require allowance is big enough
    require(_value <= allowance[_from][msg.sender],  "value is bigger than the allowance");
    // change balance
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    // update allowance
    allowance[_from][msg.sender] -= _value;
    // Transfer event
    emit Transfer(_from, _to, _value);
    return true;
  }
}
