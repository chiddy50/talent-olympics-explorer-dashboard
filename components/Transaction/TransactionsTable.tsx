"use client";

import React, { useContext } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { copyToClipboard, truncateAddress, truncateString } from '@/lib/helper';
import { Copy, Eye } from 'lucide-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Transaction } from '@/interfaces/transactionInterface';
import { AppContext } from '@/context/MainContext';
import TransactionInformationComponent from './TransactionInformationComponent';
import { SheetTrigger } from '../ui/sheet';


function TransactionsTable({ transactions }: { transactions: Transaction[]}) {
    const { 
        setSingleTransaction
    } = useContext(AppContext);

    return (
        <Table className='border'>
            <TableCaption>The list of address transactions.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Fee (SOL)</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Signature</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction: Transaction, index: number) => (
                    <TableRow key={`${transaction.signature}_${index}`} className='text-[12px]'>

                        <TableCell>
                            <TransactionInformationComponent transaction={transaction}>
                                <SheetTrigger>
                                    <Eye className='w-5 h-5 cursor-pointer' />
                                </SheetTrigger>
                            </TransactionInformationComponent>
                        </TableCell>

                        <TableCell>
                            {transaction.description ? transaction.description : "Unknown Transaction"}
                        </TableCell>
                        <TableCell>
                            {transaction.source.split('_').join(' ')}
                        </TableCell>
                        <TableCell>
                            { transaction?.fee ? transaction.fee/LAMPORTS_PER_SOL : 0}
                        </TableCell>
                        <TableCell>
                            {transaction.type.split('_').join(' ')}
                        </TableCell>
                        <TableCell className=" text-blue-500 flex items-center">
                            <span className='cursor-pointer'>
                                {truncateString(transaction.signature, 9)}
                            </span>
                            <Copy onClick={() => copyToClipboard(transaction.signature)} className='h-3 w-3 cursor-pointer'/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            
        </Table>   
    )
}

export default TransactionsTable
