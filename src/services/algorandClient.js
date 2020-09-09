import algosdk from 'algosdk';

const token = {
    'X-API-Key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
}
const api = "https://testnet-algorand.api.purestake.io/ps2";
const port = '';

const algorandClient = new algosdk.Algodv2(    
    token, 
    api, 
    port
);

export default algorandClient;