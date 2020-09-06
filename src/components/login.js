import React from 'react';
import getGlobalState from '../services/getGlobalState';
//import algorandClient from './services/algorandClient';
import {Button, Form} from "react-bootstrap"
import algosdk from "algosdk";

function Login() {

  const [globalState, globalActions] = getGlobalState();

  const createAccount = ( event ) => {
    event.preventDefault();
    var keys = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    globalActions.setMnemonic(mnemonic)
    globalActions.setAddress(keys.addr)
    globalActions.setLoginStatus(true)
  }

  const handleLogin = ( event ) => {
    event.preventDefault();    
    globalActions.setErrorMessage('')

    var keys;
    try {
        keys = algosdk.mnemonicToSecretKey(globalState.mnemonic);    
    } catch (error) {
        globalActions.setErrorMessage('Invalid mnemonic')
        return;
    }   

    var isValid = algosdk.isValidAddress(keys.addr);
    if (isValid){
        globalActions.setAddress(keys.addr)
        globalActions.setLoginStatus(true)
    }    
  }

  const handleLogout = ( event ) => {
    globalActions.setAddress('')
    globalActions.setMnemonic(''); // tmp: during development
    globalActions.setLoginStatus(false)
  }

  if (globalState.loginStatus){
    return (
        <>
        Login success<br/><br/>
        <Button onClick={handleLogout} variant="primary">Log out</Button>
        </>
    );
  }else{
    return (
        <>
        
        <Button onClick={createAccount} variant="info">Create Account</Button>
        <Form>      
          <Form.Group controlId="mnemonic">
              <Form.Label></Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="mnemonic" 
                  value={globalState.mnemonic}
                  onChange={( event ) => globalActions.setMnemonic( event.target.value )}
                  />
              <Form.Text className="text-muted">
                  Enter mnemonic or click "Create Account" button to generate a new mnemonic. 
                  Save your mnemonic for future login. Lost mnemonic can not be retrived.
              </Form.Text>
          </Form.Group>
          </Form>
          <Button onClick={handleLogin} variant="primary">Login</Button>
          
        </>
    );
  }




}

export default Login;
