import React from 'react';
import './App.css';
import { Row, Col, Container, Alert} from "react-bootstrap"
import Login from "./components/login"
import getGlobalState from './services/getGlobalState'
import Account from "./components/account"
import Transactions from "./components/transactions"
import Transfer from "./components/transfer"

function App() {

  const [globalState, globalActions] = getGlobalState();

  if (globalState.apiKeyPurestake === ''){
    globalActions.setErrorMessage('API key not set in src/services/getGlobalState.js')
    return (
      <><br/>
        <Container className="App">      
          <Row><Col><br/><h1 className="header">Algorand Wallet (V2)</h1></Col></Row>
          <Row>
          <Col>
          {globalState.errorMessage &&
            <Alert variant="danger">{globalState.errorMessage}</Alert>
          }          
          </Col>
          </Row>
        </Container>
      </>  
    )
  }

  return (
    <><br/>
      <Container className="App">      
        <Row><Col><br/><h1 className="header">Algorand Wallet (V2)</h1></Col></Row>
        <Row>
        <Col>
          <br/>  
          {globalState.errorMessage &&
            <Alert variant="danger">{globalState.errorMessage}</Alert>
          }
          
          {globalState.address &&
            <Alert variant="success">
              <Account />
            </Alert>
          }
        </Col>
        </Row>
        <Row>
          <Col sm={ globalState.address? 2 : 4 }>
            <Container className="App">
              <Row><Col><h3 className="header">&nbsp;</h3></Col></Row>
              <Row><Col><Login/></Col></Row>
            </Container>
          </Col>
          <Col sm={ globalState.address? 6 : 4 }>
            <Container className="App">
              <Row><Col><h3 className="header">Transactions</h3></Col></Row>
              <Row><Col>
                <Transactions />
              </Col></Row>
            </Container>          
          </Col>
          <Col sm={ globalState.address? 4 : 4 }>
            <Container className="App">
              <Row><Col><h3 className="header">Send</h3></Col></Row>
              <Row><Col>
              <Transfer />
              </Col></Row>
            </Container>          
          </Col>
        </Row>
      </Container>
    </>  
  );
}

export default App;
