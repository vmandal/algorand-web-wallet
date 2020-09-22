import algosdk from 'algosdk';
import getGlobalState from './getGlobalState';

//const algorandClient

function algorandClient() {

    const [globalState] = getGlobalState();

    const token = {
        'X-API-Key': globalState.apiKeyPurestake, 
    }
    const api = "https://testnet-algorand.api.purestake.io/ps2";
    const port = '';
    
    return new algosdk.Algodv2(    
        token, 
        api, 
        port
    );
}
//algorandClientFn()


export default algorandClient;