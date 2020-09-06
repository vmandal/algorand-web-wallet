import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  loginStatus: false,
  address: '',
  mnemonic: "",
  errorMessage: '' 
};

const actions = {
  setLoginStatus: (store, loginStatus) => {
    //const counter = store.state.counter + amount;
    store.setState({ loginStatus });
  },
  setMnemonic: (store, mnemonic) => {
    store.setState({ ...store, mnemonic });
  },
  setAddress: (store, address) => {
    store.setState({ ...store, address });
  },
  setErrorMessage: (store, errorMessage) => {
    store.setState({ ...store, errorMessage });
  },

};


const getGlobalState = useGlobalHook(React, initialState, actions);

export default getGlobalState;