import React, {useState, useEffect} from 'react';
import getGlobalState from '../services/getGlobalState';
//import algorandClient from '../services/algorandClient';
//import {Button, Form} from "react-bootstrap"
//import algosdk from "algosdk";

function Transfer() {

  const [globalState, globalActions] = getGlobalState();

  useEffect(() => {
    //console.log('mounted')


  }, [globalState.loginStatus]);


  if (globalState.loginStatus){
    return (
        <>
        Do transfer      
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
