import React from 'react';
import './App.css';
import { Row, Col, Container, Button, Alert} from "react-bootstrap"
import Login from "./components/login"
import getGlobalState from './services/getGlobalState'
import Transactions from "./components/transactions"
import Transfer from "./components/transfer"

function App() {

  const [globalState] = getGlobalState();

  return (
    <><br/>
      <Container className="App">      
        <Row><Col><br/><h1 className="header">Algorand Wallet</h1></Col></Row>
        <Row>
          <Col>
            <Container className="App">
              <Row><Col><h3 className="header">&nbsp;</h3></Col></Row>
              <Row><Col><Login/></Col></Row>
            </Container>
          </Col>
          <Col>
            <Container className="App">
              <Row><Col><h3 className="header">Account Info</h3></Col></Row>
              <Row><Col>
                <Transactions />
              </Col></Row>
            </Container>          
          </Col>
          <Col>
            <Container className="App">
              <Row><Col><h3 className="header">Transfer</h3></Col></Row>
              <Row><Col>
              <Transfer />
              </Col></Row>
            </Container>          
          </Col>
        </Row>
        <Row>
        <Col>

        {globalState.errorMessage &&
          <Alert variant="danger">{globalState.errorMessage}</Alert>
        }
        
        {globalState.address &&
          <Alert variant="success">{globalState.address}</Alert>
        }
        
        </Col>
        </Row>
      </Container>
    </>  
  );
}

export default App;
