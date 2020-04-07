import Web3 from 'web3'
import { abi as decentralightAbi } from './Decentralight.json'
import { abi as erc20Abi } from '@openzeppelin/contracts-ethereum-package/build/contracts/StandaloneERC20';
import { abi as faucetAbi } from './ERC20Faucet.json' 


export class ContractsApi {
    constructor() {
        this.web3 = new Web3(Web3.givenProvider);
        this.decentralightContractAddress = '0xc2CD65B7b58399126373cd0D56b5afa07965052c';
        this.erc20ContractAddress = '0xC6938Ee7EaBd2a8afCdA1DcEf15F923facf7aa66';
        this.faucetContractAddress = '0xab15562508f02ef741AAD1Ca45D8bf886981F92D'
        this.decentralightContract = new this.web3.eth.Contract((decentralightAbi), this.decentralightContractAddress);
        this.erc20contract = new this.web3.eth.Contract((erc20Abi), this.erc20ContractAddress);
        this.faucetContract = new this.web3.eth.Contract((faucetAbi), this.faucetContractAddress);
    }

    async init() {
        await window.ethereum.enable();
    }

    get selectedAddress() { return window.ethereum.selectedAddress; }
    
    approve() {
        const promiEvent = this.erc20contract.methods.approve(this.decentralightContractAddress, 1).send({ from: this.selectedAddress });
        return new TransactionWatcher(promiEvent);
    }
    async getState() {
        return await this.decentralightContract.methods.getState().call();
    }
    async getAllowance() {
        return await this.erc20contract.methods.allowance(this.selectedAddress, this.decentralightContractAddress);
    }
    toggle(){
        const promiEvent = this.decentralightContract.methods.toggle().send({ from: this.selectedAddress });
        return new TransactionWatcher(promiEvent);
    }
    async getCurrentBlance() {
        const balance = await this.erc20contract.methods.balanceOf(this.selectedAddress).call();
        return balance;
    }
    async transferFrom() {
        await this.erc20contract.methods.transferFrom(this.selectedAddress, this.decentralightContractAddress).send({from: this.selectedAddress});
    }
    withdraw() {
        const promiEvent = this.faucetContract.methods.withdraw().send({from: this.selectedAddress})
        return new TransactionWatcher(promiEvent);
    }
    // subscribeToToggle(callback) {
    //     function handler(error, event){
    //         console.log(error, event)
    //         if (!error)
    //             callback(event.returnValues);
    //     }
    //     return this.decentralightContract.events.Toggle({}, handler);
    // }
}

class TransactionWatcher {
    constructor(promiEvent){
        this.promiEvent = promiEvent; 
    }
    onTxHash(callback){
        this.promiEvent.once('transactionHash', () => { console.log("hash"); callback(); });
        return this;
    }
    onConfirmation(callback){
        this.promiEvent.on('confirmation', (confirmationNumber) => {
            console.log("confirmation", confirmationNumber);
        if(confirmationNumber === 0){
            console.log("Confirmed")
            callback();
        }
        })
        return this;
    }

    then(callback) {
        return this.promiEvent.then(callback);
    }
}