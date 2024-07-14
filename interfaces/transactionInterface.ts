export interface TransactionSource {
    value: string;
    label: string;
}

export interface TransactionType {
    value: string;
    label: string;
}


export interface RawTokenAmount {
    tokenAmount: string;
    decimals: number;
}

export interface TokenBalanceChange {
    userAccount: string;
    tokenAccount: string;
    rawTokenAmount: RawTokenAmount;
    mint: string;
}

export interface AccountData {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: TokenBalanceChange[];
}


export interface TokenTransfer {
    fromTokenAccount: string;
    toTokenAccount: string;
    fromUserAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    mint: string;
    tokenStandard: string;
}

export interface NativeTransfer {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
}

export interface InnerInstruction {
    accounts: string[];
    data: string;
    programId: string;
}

export interface Instruction {
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: InnerInstruction[];
}

export interface Transaction {
    description: string;
    type: string;
    source: string;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    timestamp: number;
    tokenTransfers: TokenTransfer[];
    nativeTransfers: NativeTransfer[];
    accountData: AccountData[];
    transactionError: any;
    instructions: Instruction[];
    events: Record<string, any>;
}