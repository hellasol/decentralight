import Web3 from 'web3'
import { abi as decentralightAbi } from './Decentralight.json'
import { abi as erc20Abi } from '@openzeppelin/contracts-ethereum-package/build/contracts/StandaloneERC20';
import { abi as faucetAbi } from './ERC20Faucet.json' 


export class ContractsApi {
    constructor() {
        this.web3 = new Web3(Web3.givenProvider);
        this.decentralightContractAddress = '0x8057841f4524A40af936304E817af18191470478';
        this.erc20ContractAddress = '0xC6938Ee7EaBd2a8afCdA1DcEf15F923facf7aa66';
        this.faucetContractAddress = '0xab15562508f02ef741AAD1Ca45D8bf886981F92D'
        this.decentralightContract = new this.web3.eth.Contract((decentralightAbi), this.decentralightContractAddress);
        this.erc20contract = new this.web3.eth.Contract((erc20Abi), this.erc20ContractAddress);
        this.faucetContract = new this.web3.eth.Contract((faucetAbi), this.faucetContractAddress);
    }
    
    async approve() {
        await this.erc20contract.methods.approve(this.decentralightContractAddress, 1).send({from: await this.getCurrentAccount()});
    }
    async getState() {
        return await this.decentralightContract.methods.getState().call();
    }
    async getAllowance() {
        return await this.erc20contract.methods.allowance(await this.getCurrentAccount(), this.decentralightContractAddress);
    }
    async toggle(){
        await this.decentralightContract.methods.toggle().send({from: await this.getCurrentAccount()});
    }
    async getCurrentAccount() {
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
    }
    async getCurrentBlance() {
        const balance = await this.erc20contract.methods.balanceOf(await this.getCurrentAccount()).call();
        return balance;
    }
    async transferFrom() {
        await this.erc20contract.methods.transferFrom(await this.getCurrentAccount(), this.decentralightContractAddress).send({from: await this.getCurrentAccount()});
    }
    async withdraw() {
        await this.faucetContract.methods.withdraw().send({from: await this.getCurrentAccount()})
    }

}