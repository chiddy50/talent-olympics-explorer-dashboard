"use client";

import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search } from 'lucide-react';
import { fetchAddressTransactions } from '@/lib/heliusApi';
import { validateSolanaAddress } from '@/lib/helper';

import { Skeleton } from "@/components/ui/skeleton"
import { ComboboxComponent } from '@/components/ComboboxComponent';
import TransactionsTable from './TransactionsTable';
import { Transaction, TransactionSource, TransactionType } from "@/interfaces/transactionInterface"

const API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_API_BASE_URL = process.env.NEXT_PUBLIC_HELIOS_API_URL;

function TransactionsHistoryComponent() {
    const [address, setAddress] = useState<string >('');
    const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
    const [openTransactionInfoModal, setOpenTransactionInfoModal] = useState<boolean>(false);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[] | []>([]);
    const [source, setSource] = useState<TransactionSource|null>(null);
    const [type, setType] = useState<TransactionType|null>(null);
    const [transaction, setTransaction] = useState<Transaction|null>(null);

    const fetchAndParseTransactions = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!addressIsValid) {
            return    
        }

        setLoading(true)
        setTransactions([])            

        const response = await fetchAddressTransactions(address, source?.value, type?.value);
        setLoading(false)
        
        if (!response) {
            return
        }
        setTransactions(response)            
    }

    const validateAddress = async (address: string) => {
        let validAddress = await validateSolanaAddress(address)
        if (!validAddress) {
            return;    
        }
        setAddressIsValid(true);
        
        setAddress(address)
    }
    
    const addTypeQueryToGetTransactions = async (type: string) => {
        if (!address) {
           return 
        }
        setLoading(true);
        const response = await fetchAddressTransactions(address, source?.value, type);
        setLoading(false);
    }

    const addSourceQueryToGetTransactions = async (type: string) => {
        if (!address) {
            return 
        }
        setLoading(true);
        const response = await fetchAddressTransactions(address, source?.value, type);
        setLoading(false);
    }
    
    useEffect(() => {
        let selectedSource = source?.value;
        if (selectedSource) {            
            addSourceQueryToGetTransactions(selectedSource)
        }
    }, [source])

    useEffect(() => {
        let selectedType = type?.value;
        if (selectedType) {            
            addTypeQueryToGetTransactions(selectedType)
        }
    }, [type])

    return (
        <TabsContent value="transaction_history">
            <Card>

                <CardHeader>
                    <CardTitle>Transactions History</CardTitle>
                    <CardDescription>
                    View your transaction history by providing a valid Solana address
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">            

                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => fetchAndParseTransactions(e)}
                        className='my-7 gap-4'
                    >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Address</Label>
                            <div className='flex items-center border rounded-md px-4'>
                                <input type="text" 
                                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => validateAddress((e.target as HTMLInputElement).value)} 
                                className='px-1 py-3 w-full outline-none rounded-md text-xs bg-background' 
                                placeholder='Search Address here...'
                                />
                                <Search className='w-5 h-5 cursor-pointer'/>
                            </div>
                        </div>
                        
                    </form>

                    <div className="mt-7">
                        { 
                            loading && 
                            <>
                                {
                                    Array.from({ length: 4 }).map((_, index) =>  <Skeleton key={index} className="h-10 mb-3 w-full" /> )
                                }
                            </>
                        }

                        {
                            transactions.length > 0 && !loading &&
                            <div className='overflow-x-auto'>
                                <TransactionsTable transactions={transactions}/>
                            </div>
                        }                        

                    </div>
                
                </CardContent>
            </Card>

            
        </TabsContent>
    )
}

export default TransactionsHistoryComponent
