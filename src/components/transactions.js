import React, {useState, useEffect} from 'react';
import getGlobalState from '../services/getGlobalState';
import {Table} from "react-bootstrap"
import moment from "moment"

function Transactions() {


  const [globalState, globalActions] = getGlobalState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    setTransactions([]); // 

    if (globalState.address !== ''){

      globalActions.setErrorMessage('loading...')

      fetch(`https://testnet-algorand.api.purestake.io/idx2/v2/accounts/${globalState.address}/transactions?` + new URLSearchParams({
        limit: '10',
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
            globalActions.setErrorMessage('Not able to connect. Check browser console')
          }else{
            setTransactions(result.transactions)
            globalActions.setErrorMessage('')
          }

        },
        (error) => {
          globalActions.setErrorMessage(error)
          console.log(error)
        }
      )

    }

  }, [globalState.refresh, globalState.address]);

  if (globalState.loginStatus){
    return (
      <>
        <Table striped bordered hover>
            <thead key={1}>
              <tr>
                <th>Date</th>
                <th>Amout</th>
                <th>Receiver</th>
                <th>Type</th>
              </tr>  
            </thead>
            <tbody>
              {transactions.map(t => (
                  <tr key={t['id']}>
                    <th>{moment.unix(t['round-time']).format("MMM Do YY")}</th>
                    <th>{t['payment-transaction']['amount'] / 1000000}</th>
                    <th>{t['payment-transaction']['receiver'].substring(0, 8) + '...'}</th>
                    <th>
                      { t['payment-transaction']['receiver'] === globalState.address && 'Credit' }
                      { t['payment-transaction']['receiver'] !== globalState.address && <span style={{ color: 'red' }}>Debit</span> }
                    </th>
                    
                  </tr>
              ))}
          </tbody>
        </Table>
        (last 10 transactions)
      </>
    );
  }else{
    return (
        <>
        Login to view details
        </>
    );
  }

}

export default Transactions;
