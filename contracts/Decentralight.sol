pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";


contract Decentralight is Initializable{
    bool private _state;
    IERC20 private _token;

    function initialize(IERC20 token) public {
        _state = false; 
        _token = token;
    }

    function toggle() public {
        _token.transferFrom(msg.sender, address(this), 1);
        _state = !_state;


    }

    // Reads the last stored value
    function getState() public view returns (bool) {
        return _state;
    }


}