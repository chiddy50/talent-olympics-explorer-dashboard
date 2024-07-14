"use client";

import React from 'react'
import {
    Tabs,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import TokenBalanceComponent from './TokenBalanceComponent';

function TokenComponent() {
  return (
    <Tabs defaultValue="token_balance" className="w-full mt-7">

        {/* Token Balance Component */}
        <TokenBalanceComponent />

      
    </Tabs>
  )
}

export default TokenComponent
