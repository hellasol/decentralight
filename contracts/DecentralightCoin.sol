pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract DecentralightCoin is Initializable, ERC20, ERC20Detailed {

    function initialize(address beneficiary, uint256 amount) initializer public {
        ERC20Detailed.initialize("DecentralightCoin", "DEC", 0);
        _mint(beneficiary, amount);
    }
}