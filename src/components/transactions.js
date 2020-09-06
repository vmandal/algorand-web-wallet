import React, {useState, useEffect} from 'react';
import getGlobalState from '../services/getGlobalState';
import algorandClient from '../services/algorandClient';
//import {Button, Form} from "react-bootstrap"
//import algosdk from "algosdk";

function Transactions() {

  const [globalState, globalActions] = getGlobalState();

  useEffect(() => {
    //console.log('mounted')
    let accountDetail
    if (globalState.address !== ''){
        (async () => {

            accountDetail = await algorandClient.accountInformation(globalState.address);
            console.log(accountDetail);
            console.log(accountDetail.amount / 1000000)
    
        })().catch(e => {
            console.log(e);
        });    
    }

  }, [globalState.address]);

  const getAccountBalance = async ( address ) => {
        
    
    /*this.setState({
      balance: accountDet.amount / 1000000
    });*/    
  };



  if (globalState.loginStatus){
    return (
        <>
        Account balance:         
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
