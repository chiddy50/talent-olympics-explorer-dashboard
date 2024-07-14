"use client";

import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Transaction } from '@/interfaces/transactionInterface';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { formatTimestamp, truncateString } from '@/lib/helper';
import CopyTextComponent from '../General/CopyTextComponent';

interface TransactionInformationComponentProps {
    children: ReactNode;
    transaction: Transaction
}

const TransactionInformationComponent: React.FC<TransactionInformationComponentProps> = ({children, transaction}) => {
    console.log("transaction", transaction);
    
    return (
        <Sheet>
            {children}
            <SheetContent className='w-[90%] sm:w-[540px] overflow-y-auto'>
                <SheetHeader className='gap-3'>
                    <SheetTitle>{transaction?.type}</SheetTitle>
                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>DESCRIPTION</span>
                        <span className="text-xs ">
                            {transaction?.description}
                        </span>
                    </SheetDescription>

                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>SOURCE</span>
                        <span className="text-xs ">
                            {transaction.source.split('_').join(' ')}
                        </span>
                    </SheetDescription>

                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>FEE</span>
                        <span className="text-xs ">
                        { transaction?.fee ? transaction.fee/LAMPORTS_PER_SOL : 0}                        
                        </span>
                    </SheetDescription>

                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>SIGNATURE</span>
                        <span className="text-xs ">
                            <CopyTextComponent text={transaction.signature} format={true} format_type="text" className='text-xs' />
                        </span>
                    </SheetDescription>

                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>FEE PAYER</span>
                        <span className="text-xs ">
                            <CopyTextComponent text={transaction?.feePayer} format={true} format_type="address" className='text-xs' />
                        </span>
                    </SheetDescription>

                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>DATE</span>
                        <span className="text-xs ">
                            {formatTimestamp(transaction.timestamp)}
                        </span>
                    </SheetDescription>

                    
                </SheetHeader>
            </SheetContent>
            
        </Sheet>
  )
}

export default TransactionInformationComponent
