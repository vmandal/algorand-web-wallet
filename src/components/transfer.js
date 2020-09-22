import React, {useState} from 'react';
import getGlobalState from '../services/getGlobalState';
//import algorandClient from '../services/algorandClient';
import {Button, Form, Alert} from "react-bootstrap"
import algosdk from "algosdk";

function Transfer() {

  const [globalState, globalActions] = getGlobalState();
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [disableBtn, setDisableBtn] = useState(false)

  const token = {
    'X-API-Key': globalState.apiKeyPurestake, 
  }
  const api = "https://testnet-algorand.api.purestake.io/ps2";
  const port = '';            
  const algorandClient = new algosdk.Algodv2(    
      token, 
      api, 
      port
  );


  const handleSend = () => {

    // validate address
    var isValid = algosdk.isValidAddress(receiver);
    if (!isValid){
      globalActions.setErrorMessage('Invalid receiver address')
      return
    }

    setTransactionSuccess(false);
    setDisableBtn(true);

    (async () => {

      let myAccount = algosdk.mnemonicToSecretKey(globalState.mnemonic)

      let params = await algorandClient.getTransactionParams().do();
      params.fee = 1000;
      params.flatFee = true;

      let noteEncoded = algosdk.encodeObj(note);
      let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, receiver, amount * 1000000, undefined, noteEncoded, params); 
  
        // Sign the transaction
      let signedTxn = txn.signTxn(myAccount.sk);
      let txId = txn.txID().toString();
      globalActions.setErrorMessage("Signed transaction with txID: %s", txId);

        // Submit the transaction  
      globalActions.setErrorMessage('transaction submitted. Waiting for confirmation...')
      await algorandClient.sendRawTransaction( signedTxn ).do();

        // check status
      await updateTransactionStatus( txId, receiver )  

    })().catch(e => {
      console.log(e);
    }); 

  };


  const updateTransactionStatus = async function ( txId, receiver ) {

    const myInterval = setInterval(async function(){

      fetch(`https://testnet-algorand.api.purestake.io/idx2/v2/accounts/${receiver}/transactions?` + new URLSearchParams({
        txid: txId,
      }), {
        headers: {
          'x-api-key': globalState.apiKeyPurestake
        },
      })
      .then(res => res.json())
      .then(
        (result) => {

          //console.log(result)
          if (result.transactions === undefined){
            console.log(result);
            globalActions.setErrorMessage(result)
          }else if (result.transactions.length > 0 ){
            clearInterval(myInterval)
            setTransactionSuccess(true)
            globalActions.setErrorMessage('')
            globalActions.doRefresh(!globalState.refresh)
            setAmount(0)
            setNote('')
            setDisableBtn(false)
          }
        },
        (error) => {
          globalActions.setErrorMessage(error)
        }
      )

    }, 2000);
  }; 

  if (globalState.loginStatus){
    return (
        <>

        <Form>      

          <Form.Group controlId="receiver">
              <Form.Label>Receiver's address</Form.Label>
              <Form.Control type="text" value={receiver}
                  onChange={( event ) => setReceiver( event.target.value )}
                  />
          </Form.Group>

          <Form.Group controlId="amount">
              <Form.Label>Amout</Form.Label>
              <Form.Control type="text" value={amount}
                  onChange={( event ) => setAmount( event.target.value )}
                  />
              <Form.Text className="text-muted">
                  Enter amount of ALGO to send
              </Form.Text>
          </Form.Group>

          <Form.Group controlId="amount">
              <Form.Label>Note</Form.Label>
              <Form.Control type="text" value={note}
                  onChange={( event ) => setNote( event.target.value )}
                  />
              <Form.Text className="text-muted">
                  enter a note (optional)
              </Form.Text>
          </Form.Group>
          
          </Form>
          <Button onClick={() => handleSend()} variant="primary" disabled={disableBtn}>Send</Button>
          <br/>
          {transactionSuccess && 
            <Alert variant="success">Transaction done!</Alert>
          }
          </>
    );
  }else{
    return (
        <>
        Login to perform transactions
        </>
    );
  }

}

export default Transfer;
