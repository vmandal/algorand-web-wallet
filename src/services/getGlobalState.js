import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  loginStatus: false,
  address: '',
  mnemonic: '',
  errorMessage: '',
  refresh: false
};

const actions = {
  setMnemonic: ( store, mnemonic ) => {
    store.setState({ ...store, mnemonic });
  },
  doRefresh: ( store ) => {
    store.setState({ ...store, ...{ refresh: !store.refresh }});
  },
  setErrorMessage: ( store, errorMessage ) => {
    store.setState({ ...store, errorMessage });
  },
  doLogin: ( store, loginVars ) => {
    store.setState({ ...store, ...loginVars });
  },
  doLogout: ( store ) => {
    store.setState({ ...store, ...initialState });
  },

};


const getGlobalState = useGlobalHook(React, initialState, actions);

export default getGlobalState;