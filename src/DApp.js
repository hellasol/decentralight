import React, { useState, useEffect } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {ContractsApi} from './ContractsApi'
import './App.css';
import lightbulbON from './images/lightbulbON.png';
import lightbulbOFF from './images/lightbulbOFF.png';
import SwitchExample from './components/button';

export function DApp() {
  const [account, setAccount] = useState(null); 
  const [balance, setBalance] = useState(0);
  const [lightStatus, setLightStatus] = useState(false);
  const contractsApi = new ContractsApi();

  useEffect(() => {
    async function fetchData(){
      const currentAccount = await contractsApi.getCurrentAccount();
      const currentBalance = await contractsApi.getCurrentBlance();
      const currentLightStatus = await contractsApi.getState();
      console.log(currentLightStatus);
      setAccount(currentAccount);
      setBalance(currentBalance);
      setLightStatus(currentLightStatus)
    }
    fetchData();
  }, []); 

  async function handleToggle() {
     await contractsApi.toggle(); 
     // setLightStatus(!lightStatus);
  }
  async function handleWithdraw(){
    await contractsApi.withdraw();
  }

    return (
      <div className="App">
        <div className="App-header">
        <p >Your account: {account}</p>
        <p>Your DEC balance: {balance}</p>
        <h1>Decentralight</h1>
        </div>
        <br />
        <br />
        <Row>
      <Col sm={{ size: 4, offset: 1 }}>
        <Card body
           inverse
           style={{
           backgroundColor: "#282c34",
           borderColor: "#282c34",
           position: ""
          }}
          className="text-center">
            <br />     
          <h1>Faucet</h1>
          <br />
          <br />
          <CardText>
            <Button onClick={handleWithdraw}>Get 1 decentralight coin!</Button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          <Row><p style={{marginLeft: "55px"}}>Enable to approve a transaction</p><SwitchExample/></Row>
        </CardText>
        </Card>
        </Col>
        <Col sm={{ size: 3, offset: 0 }}>
        <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        <Button onClick={handleToggle}>light switch</Button>
        </Col>
        <Col sm={{ size: 2, offset: 0 }}>
            <br />
            <br />
        {lightStatus ? <img src={lightbulbON} alt="ON"  width="200"/> : <img src={lightbulbOFF} alt="OFF" width="200" />}
        </Col>

      
        </Row>
        

   </div>

    );
}