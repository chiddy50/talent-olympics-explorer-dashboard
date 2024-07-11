import axios from 'axios';

// "https://devnet.helius-rpc.com/?api-key=dcbb39d0-c580-4530-8af2-36289b506520";
const HELIUS_API_BASE_URL = "https://devnet.helius-rpc.com";
const API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;


export const fetchTransactions = async (address: string) => {
    const response = await axios.get(`${HELIUS_API_BASE_URL}/transactions?address=${address}&api-key=${API_KEY}`);
    return response.data;
};

export const fetchAccountInfo = async (address: string) => {
    const response = await axios.get(`${HELIUS_API_BASE_URL}/account/${address}?api-key=${API_KEY}`);
    return response.data;
};

export const fetchTokenBalances = async (address: string) => {
    const response = await axios.get(`${HELIUS_API_BASE_URL}/tokens/${address}?api-key=${API_KEY}`);
    return response.data;
};

export const parseTransaction = async () => {
    const body = {
        transactions: ["your-txn-id-here"],
    }
    
    const response = await axios.get(`${HELIUS_API_BASE_URL}/v0/transactions?api-key=${API_KEY}`);  
    console.log("parsed transaction: ", response);
  };