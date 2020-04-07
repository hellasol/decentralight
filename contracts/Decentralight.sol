pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/SafeERC20.sol";


contract Decentralight is Initializable{
    using SafeERC20 for IERC20;
    bool private _state;
    IERC20 private _token;
    uint256 private _amount;

    event Toggle(address indexed from, bool state);

    function initialize(IERC20 token, uint256 amount) public {
        _state = false;
        _amount = amount;
        _token = token;
    }

    function toggle() public {
        _token.transferFrom(msg.sender, address(this), _amount);
        _state = !_state;
        emit Toggle(msg.sender, _state);
    }

    function getState() public view returns (bool) {
        return _state;
    }
    function getAmount() public view returns (uint256){
        return _amount;
}

}