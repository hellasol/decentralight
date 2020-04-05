import React, { Component } from "react";
import Switch from "react-switch";
import {ContractsApi} from '../ContractsApi'

 
export default class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);

  }

  async handleChange(checked) {
    this.setState({ checked });  
    const contractsApi = new ContractsApi();
    await contractsApi.approve(); 


  }
 
  render() {
    return (
      <label>
    <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

// import React, { useState, useEffect } from "react"; 
// import lightbulbON from '../images/lightbulbON.png';
// import lightbulbOFF from '../images/lightbulbOFF.png';
// import { abi as decentralightAbi } from '../Decentralight.json'
// import Web3 from 'web3'



//  export function ChangeLight () {
   
   
//       this.web3 = new Web3(Web3.givenProvider);


//     let decentralightContractAddress = '0x8057841f4524A40af936304E817af18191470478';
//     this.decentralightContract = new this.web3.eth.Contract((decentralightAbi), decentralightContractAddress);
//     const [lightStatus, setLightStatus] = useState(false);
//     useEffect(() => {
//         this.loadBlockchainData();
//         this.decentralightContract.methods.getState().call().then(setLightStatus);

//       });
//         async function toggleLightStatus() {
//             setLightStatus(!lightStatus)
//         }
        
//         return(
//          <button onClick={toggleLightStatus}>
//          {lightStatus ? <img src={lightbulbON} alt="ON"  width="250"/> : <img src={lightbulbOFF} alt="OFF" width="250" />}
//         </button>
//         )
//     }
