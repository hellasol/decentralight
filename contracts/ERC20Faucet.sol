pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract ERC20Faucet is Initializable{
    IERC20 private _token;

    function initialize(IERC20 token) public {
        _token = token;
    }

    function withdraw() public {
        _token.transfer(msg.sender, 1);
    }
}