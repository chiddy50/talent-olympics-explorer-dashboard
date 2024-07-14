"use client";

import React from 'react'
import PageTitle from '@/components/PageTitle'
import { ModeToggle } from '@/components/mode-toggle'
import { StackIcon } from '@radix-ui/react-icons'
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

function NavigationComponent() {
  return (
    <div>
      <header className="flex justify-between items-center w-[90%] mx-auto">
        <Link href="/" className='cursor-pointer'>
          <div className='flex items-center gap-2'>
            <StackIcon className='w-10 h-10'/>
            <PageTitle title="EXPLORER" className='xs:hidden sm:block'/>
          </div>
        </Link>  

        <div className='flex items-center gap-7'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='flex items-center gap-2 px-3 py-1 outline-none bg-background'>
                <Menu className='w-5 h-5'/>
                <span>MENU</span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>              
              <DropdownMenuItem>
                <Link href='/token' className='w-full h-full'>Token</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/transaction'>Transaction</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>

          <ModeToggle />
        </div>
      </header>

      <div className='w-[90%] mx-auto my-20'>
        <h1 className="xs:text-5xl sm:text-5xl lg:text-7xl font-bold text-center ">EXPLORER</h1>
        <div className="text-center mt-4">
          <p className="text-lg">A simple blockchain explorer. Enabling users to explore transactions and address on the Solana network</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <Link href="/transaction">
          <div className="bg-gray-700 font-bold text-gray-200 w-40 px-4 py-1 rounded-xl flex items-center justify-center">
              Transaction
          </div>
        </Link>
        <Link href="/token">
          <div className="bg-gray-700 font-bold text-gray-200 w-40 px-4 py-1 rounded-xl flex items-center justify-center">
            Token
          </div>
        </Link>
      </div>

    </div>
  )
}

export default NavigationComponent
