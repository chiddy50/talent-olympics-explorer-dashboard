"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Copy, Search } from 'lucide-react';
import { copyToClipboard, truncateString, validateSolanaAddress } from '@/lib/helper';
import { fetchAssetsByOwner } from '@/lib/heliusApi';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import CopyTextComponent from '../General/CopyTextComponent';
import { TokenBalance } from '@/interfaces/tokenInterface';

import {
    SheetTrigger,
} from "@/components/ui/sheet"
import TokenInformationComponent from './TokenInformationComponent';
  
function TokenBalanceComponent() {
    const [address, setAddress] = useState<string >('');
    const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [assets, setAssets] = useState<TokenBalance[]>([]);
    const [openTokenInfoModal, setOpenTokenInfoModal] = useState(false);
    const [tokenInfo, setTokenInfo] = useState<object|null>(null);
    

    const validateAddress = async (address: string) => {
        let validAddress = await validateSolanaAddress(address)
        if (!validAddress) {
            return;    
        }
        setAddressIsValid(true);        
        setAddress(address);
    }

    const fetchAndParseTransactions = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!addressIsValid) {
            return    
        }

        setLoading(true);
        setAssets([]);
        const response = await fetchAssetsByOwner(address, page);
        setLoading(false)
        
        if (!response) {
            return
        }
        setAssets(response) 
        
    }

    const paginateParseTransactions = async (pageNumber: number) => {
        const newPageNumber = Math.max(page + pageNumber, 1);
    
        setLoading(true);
        setAssets([]);
    
        try {
            const response = await fetchAssetsByOwner(address, newPageNumber);
            if (response) {
                setAssets(response);
                setPage(newPageNumber);
            }
        } catch (error) {
            console.error("Failed to fetch assets", error);
        } finally {
            setLoading(false);
        }
    };
    
    const displayAssetTitle = (asset: TokenBalance) => {
        return (
            asset?.content?.metadata?.name ?? 
            asset?.token_info?.price_info?.currency ?? 
            asset?.content?.metadata?.description ?? 
            asset?.interface
        );
    }

    const displayAssetImage = (asset: TokenBalance) => {
        let contentCNDImageUri = asset?.content?.files[0]?.cdn_uri ?? null;
        if (contentCNDImageUri) {            
            return contentCNDImageUri
        }

        let contentLinksImage = asset?.content?.links?.image ?? null;
        if (contentLinksImage) {            
            return contentLinksImage
        }
        return null
    }

    return (
        <TabsContent value="token_balance">
            <Card>

                <CardHeader>
                    <CardTitle>Token Balance</CardTitle>
                    <CardDescription>
                    View your token balance by providing a valid Solana address
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">  

                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => fetchAndParseTransactions(e)}
                        className='my-7'
                    >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Address</Label>
                            <div className='flex items-center border rounded-md px-4'>
                                <input type="text" 
                                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => validateAddress((e.target as HTMLInputElement).value)} 
                                className='px-1 py-3 w-full outline-none bg-background rounded-md text-xs' 
                                placeholder='Search Address here...'
                                />
                                <Search className='w-5 h-5 cursor-pointer'/>
                            </div>
                        </div>
                    </form>

                    <div className="mt-7">
                        { 
                            loading && 
                            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                                {
                                    Array.from({ length: 3 }).map((_, index) =>  <Skeleton key={index} className="h-60 w-full mb-3" /> )
                                }
                            </div>
                        }

                        <div className="mx-auto w-[90%] mb-5">

                        {
                            assets.length > 0 && 
                            <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                            >
                                <CarouselContent>
                                    {assets.map((asset, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col gap-2 items-center justify-center p-6">
                                                {
                                                    displayAssetImage(asset) &&
                                                    <img 
                                                    src={displayAssetImage(asset)} 
                                                    alt={displayAssetTitle(asset)}
                                                
                                                    className='w-[50%] h-[50%] rounded-full object-cover'
                                                    />
                                                }
                                                

                                                <TokenInformationComponent asset={asset}>
                                                    <SheetTrigger>
                                                    <Button size="sm" variant="outline">More info</Button>
                                                    </SheetTrigger>
                                                </TokenInformationComponent>
                                            </CardContent>
                                        </Card>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        }

                        </div>

                        { assets.length > 0 &&
                            <Pagination>
                                <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className='cursor-pointer' onClick={() => paginateParseTransactions(-1)}/>
                                </PaginationItem>
                                
                                <PaginationItem>
                                    <PaginationNext className='cursor-pointer' onClick={() => paginateParseTransactions(1)} />
                                </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        }

                    </div>
                </CardContent>
                
            </Card>

            
        </TabsContent>
    )
}

export default TokenBalanceComponent
