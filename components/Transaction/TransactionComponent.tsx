"use client";

import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import TransactionsHistoryComponent from './TransactionsHistoryComponent';
import TransactionDetailsComponent from './TransactionDetailsComponent';

function TransactionComponent() {

    return (
        <div>            

            <Tabs defaultValue="transaction_history" className="w-full mt-7 ">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transaction_history">Transactions History</TabsTrigger>
                    <TabsTrigger value="transaction_details">Transaction Details</TabsTrigger>
                </TabsList>

                {/* Transaction History Component */}
                <TransactionsHistoryComponent />

                {/* Transaction Details Component */}
                <TransactionDetailsComponent />
            </Tabs>

            
        </div>
    )
}

export default TransactionComponent
