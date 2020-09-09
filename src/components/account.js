import React, {useState, useEffect} from 'react';
import getGlobalState from '../services/getGlobalState';
import algorandClient from '../services/algorandClient';

function Account() {

  const [globalState, globalActions] = getGlobalState();

  useEffect(() => {

    let accountDetail
    if (globalState.address !== ''){
        (async () => {

            accountDetail = await algorandClient.accountInformation(globalState.address).do();

            let amt = accountDetail.amount / 1000000
            setcurrentAmount(amt)
    
        })().catch(e => {
            console.log(e);
        });    
    }

  }, [globalState.address]);

  const [currentAmount, setcurrentAmount] = useState(0);

  

  if (globalState.loginStatus){
    return (
        <>
        Account: {globalState.address} <br/>
        Account balance: {currentAmount}
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

export default Account;
