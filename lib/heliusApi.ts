import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_API_BASE_URL = process.env.NEXT_PUBLIC_HELIOS_API_URL;
const HELIOS_RPC_URL = process.env.NEXT_PUBLIC_HELIOS_RPC_URL;


export const fetchAddressTransactions = async (address: string, source = '', type = '') => {
    try {
        if (!API_KEY) {
            throw new Error('API key is required');
        }

        // Construct query parameters
        const queryParams = new URLSearchParams({ 'api-key': API_KEY });
        if (source) queryParams.append('source', source);
        if (type) queryParams.append('type', type);

        // Construct the URL
        const url = `${HELIUS_API_BASE_URL}/addresses/${address}/transactions?${queryParams.toString()}`;

        // Fetch the transactions
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return false;
    }
};

export const fetchTransactionDetails = async (signature: string) => {
    try {        
        const body = {
            transactions: [signature],
        }
        
        const response = await axios.post(
            `${HELIUS_API_BASE_URL}/transactions?api-key=${API_KEY}`,
            body
        );  
        return response?.data
    } catch (error) {
        console.error(error);        
        return false
    }
};

export const fetchAssetsByOwner = async (address: string, page: number) => {
    let url = `${HELIOS_RPC_URL}/?api-key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByOwner',
        params: {
            ownerAddress: address,
            page: page, // Starts at 1
            limit: 6,
            displayOptions: {
                showFungible: true //return both fungible and non-fungible tokens
            }
        },
      }),
    });
    const result = await response.json();
    return result?.result?.items ?? []
};