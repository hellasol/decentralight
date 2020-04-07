pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/SafeERC20.sol";


contract ERC20Faucet is Initializable{
    using SafeERC20 for IERC20;
    IERC20 private _token;
    uint256 private _amount;


    function initialize(IERC20 token, uint256 amount) public {
        _token = token;
        _amount = amount;
    }

    function withdraw() public {
        _token.transfer(msg.sender, _amount);
    }

    function getAmount() public view returns (uint256){
        return _amount;
}
}