import algosdk from 'algosdk';

const token = {
    'X-API-Key': 'J9bNS0QTck8EeSsLpc97W1YP4HXFl9iB2JaBJRxt'
}
const api = "https://testnet-algorand.api.purestake.io/ps2";
const port = '';

const algorandClient = new algosdk.Algodv2(    
    token, 
    api, 
    port
);

export default algorandClient;