"use client";

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  TabsContent,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { formatTimestamp } from '@/lib/helper';
import { Copy, Search } from 'lucide-react';
import { fetchTransactionDetails } from '@/lib/heliusApi';
import { Transaction } from '@/interfaces/transactionInterface';
import CopyTextComponent from '../General/CopyTextComponent';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function TransactionDetailsComponent() {
    const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
    const [signature, setSignature] = useState<string >('');
    const [loading, setLoading] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchAndParseTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signature) {
            return    
        }
        setLoading(true);
        setTransactions([])

        const data = await fetchTransactionDetails(signature);
        setLoading(false);

        if (!data) {
            return
        }
        setTransactions(data)

    }

    const getSender = (transaction: Transaction) => transaction.tokenTransfers?.[0].fromUserAccount ?? 'UNKNOWN';
    const getSenderTokenAccount = (transaction: Transaction) => transaction.tokenTransfers?.[0].fromTokenAccount ?? 'UNKNOWN';
    
    const getReceiver = (transaction: Transaction) => transaction.tokenTransfers?.[0].toUserAccount ?? 'UNKNOWN';
    const getReceiverTokenAccount = (transaction: Transaction) => transaction.tokenTransfers?.[0].toTokenAccount ?? 'UNKNOWN';
    
    // const getAmount = (transaction: Transaction) => transaction.tokenTransfers?.[0].tokenAmount ?? 'UNKNOWN';
    const getAmount = (transaction: Transaction): number | string => {
        if (transaction.tokenTransfers && transaction.tokenTransfers.length > 0) {
            return transaction.tokenTransfers[0].tokenAmount ?? 'UNKNOWN';
        }
        return 'UNKNOWN';
    };
    return (
        <TabsContent value="transaction_details">
            <Card>
                <CardHeader>
                    <CardTitle>Transactions Details</CardTitle>
                    <CardDescription>
                    View more details about a transaction by providing a valid Solana transaction ID or signature
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => fetchAndParseTransaction(e)}>
                        <div className="grid w-full max-w-full items-center gap-1.5 mt-7 mb-5">
                            <Label htmlFor="address">Transaction ID/Signature</Label>
                            <div className='flex items-center border rounded-md px-4'>
                                <input type="text" 
                                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => setSignature((e.target as HTMLInputElement).value)} 
                                className='px-1 py-3 w-full outline-none bg-background rounded-md text-xs' 
                                placeholder='Search transaction ID or signature here...'
                                />
                                <Search className='w-5 h-5 cursor-pointer'/>
                            </div>
                        </div>
                    </form>



                    <div className="mt-7">
                        { loading && 
                            <>
                                {
                                    Array.from({ length: 4 }).map((_, index) =>  <Skeleton key={index} className="h-14 w-full mb-3" /> )
                                }
                            </>
                        }

                        {
                            transactions.map(transaction => (
                                
                                <Card className="w-[3/4]" key={transaction?.signature}>
                                    <CardHeader className='gap-2'>
                                        <CardTitle className='mb-3 capitalize'>{transaction?.type.toLowerCase().split('_').join(' ')}</CardTitle>
                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>SIGNATURE</span>                                            
                                            <CopyTextComponent text={transaction.signature} format={false} />
                                        </CardDescription>
                                        <CardDescription>
                                            <span className='block text-sm font-bold'>DESCRIPTION</span>
                                            <span className=' text-xs'>
                                                {transaction?.description ? transaction?.description : "UNKNOWN"}
                                            </span>
                                        </CardDescription>

                                        {/* FOR TRANSFER TRANSACTIONS ONLY */}
                                        {   
                                            transaction?.type === 'TRANSFER' &&
                                            <>       
                                                <CardDescription>
                                                    <span className='block text-sm font-bold'>AMOUNT</span>
                                                    <span className=' text-xs'>
                                                        { getAmount(transaction) }
                                                    </span>
                                                </CardDescription>                                 
                                                <CardDescription className='text-xs'>
                                                    <span className='block text-sm font-bold'>SENDER</span>
                                                    <CopyTextComponent text={getSender(transaction)} format={true} format_type="address" />

                                                </CardDescription>
                                                <CardDescription className='text-xs'>
                                                    <span className='block text-sm font-bold'>SENDER TOKEN ACCOUNT</span>
                                                    <CopyTextComponent text={getSenderTokenAccount(transaction)} format={false} />
                                                </CardDescription>
                                                <CardDescription className='text-xs'>
                                                    <span className='block text-sm font-bold'>RECEIVER</span>
                                                    <CopyTextComponent text={getReceiver(transaction)} format={true} format_type="address" />
                                                </CardDescription>
                                                <CardDescription className='text-xs'>
                                                    <span className='block text-sm font-bold'>RECEIVER TOKEN ACCOUNT</span>
                                                    <CopyTextComponent text={getReceiverTokenAccount(transaction)} format={false} />
                                                </CardDescription>
                                            </>
                                        }

                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>DETAILS</span>
                                            <span className='capitalize'>{transaction?.events?.compressed?.[0]?.metadata?.name ?? 'UNKNOWN'}</span>
                                        </CardDescription>
                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>SOURCE</span>
                                            <span className='capitalize'>{transaction?.source.toLowerCase().split('_').join(' ')}</span>
                                        </CardDescription>
                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>TIMESTAMP</span>
                                            <span className='capitalize'>{( formatTimestamp(transaction?.timestamp) )}</span>
                                        </CardDescription>
                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>FEE</span>
                                            <span>{ transaction?.fee ? transaction?.fee / LAMPORTS_PER_SOL : 0} (SOL)</span>
                                        </CardDescription>
                                        <CardDescription className='text-xs'>
                                            <span className='block text-sm font-bold'>FEE PAYER</span>
                                            <CopyTextComponent text={transaction.feePayer} format={false} />
                                        </CardDescription>
                                        
                                    </CardHeader>
                                    
                                    <CardContent className="grid gap-4">
                                        

                                    </CardContent>                                    
                                </Card>
                            ))
                        }

                    </div>

                </CardContent>
               
            </Card>
        </TabsContent>
    )
}

export default TransactionDetailsComponent
