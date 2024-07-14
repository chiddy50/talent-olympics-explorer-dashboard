import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner"

export const validateSolanaAddress = async (addr: string) => {
    let publicKey: PublicKey;
    try {
        publicKey = new PublicKey(addr);
        return await PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
        console.log(err);        
        return false;
    }
};

  
export const formatTimestamp = (timestamp: number): string => {
    const dateTimeStamp = timestamp * 1000;
    const dateObject = new Date(dateTimeStamp);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
};

export function truncateString(str: string, maxLength = 14) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

export const truncateAddress = (inputString: string | undefined) => {
    if(!inputString) return inputString;
    if (inputString.length <= 8) {
        return inputString; // If the string is already 8 characters or less, return it unchanged
    } else {
        const truncatedString = inputString.slice(0, 4) + '...' + inputString.slice(-4);
        return truncatedString;
    }
}

export const copyToClipboard = (string: string | undefined) => {

    if (string) {            
        navigator.clipboard.writeText(string); 
        toast("Copied to clipboard.")
        return true;
    }
    return false;
}