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
import { TokenBalance } from '@/interfaces/tokenInterface';
import CopyTextComponent from '../General/CopyTextComponent';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface TokenInformationComponentProps {
    children: ReactNode;
    asset: TokenBalance
}

const TokenInformationComponent: React.FC<TokenInformationComponentProps> = ({ children, asset }) =>  {

    const token_info = asset?.token_info ?? null

    const displayAssetTitle = (asset: TokenBalance) => {
        const metadataName = asset?.content?.metadata?.name;
        if (metadataName) return metadataName;
    
        const tokenInfoCurrency = asset?.token_info?.price_info?.currency;
        if (tokenInfoCurrency) return tokenInfoCurrency;
    
        const metadataDescription = asset?.content?.metadata?.description;
        if (metadataDescription) return metadataDescription;
    
        return asset?.interface;
    };
    

    const displayAssetImage = (asset: TokenBalance): string | null => {
        return asset?.content?.files?.[0]?.cdn_uri ?? asset?.content?.links?.image ?? null;
    }    

    const displayAssetDescription = (asset: TokenBalance) => {
        return asset?.content?.metadata?.description 
            ?? asset?.content?.metadata?.name 
            ?? '';
    }
    
    const calculateBalance = (balance: number, decimals: number): number => {
        const divisor = Math.pow(10, decimals);
        return balance / divisor;
    }
    

    return (
        <Sheet>
            {children}
            <SheetContent className='w-[90%] sm:w-[540px] overflow-y-auto'>
                <SheetHeader className='gap-3'>
                    <SheetTitle>{displayAssetTitle(asset)}</SheetTitle>

                    {
                        displayAssetImage(asset) &&
                        <img 
                        src={displayAssetImage(asset) || undefined} 
                        alt={displayAssetTitle(asset)}
                    
                        className='w-32 h-32 rounded-md mb-4'
                        />
                    }
                    <SheetDescription>
                        {displayAssetDescription(asset)}
                    </SheetDescription>
                    <SheetDescription className='flex flex-col text-justify'>
                        <span className='font-bold'>OWNER</span>
                        <CopyTextComponent text={asset?.ownership?.owner} format={true} format_type="address" className='text-xs' />
                    </SheetDescription>

                    {/* ASSOCIATED TOKEN ADDRESS */}
                    {
                        token_info && token_info?.price_info &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>ASSOCIATED TOKEN ADDRESS</span>

                            {token_info?.price_info && token_info?.price_info.currency && 
                                <span className='text-xs'>
                                    { asset?.content?.metadata?.name ?? token_info?.price_info?.currency } ({ token_info?.symbol })
                                </span>
                            }
                        </SheetDescription>
                    }
                    
                    {/* MINT AUTHORITY */}
                    {
                        token_info && token_info?.mint_authority &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>MINT AUTHORITY</span>

                            {token_info?.mint_authority && 
                                <span className='text-xs'>
                                    <CopyTextComponent text={token_info?.mint_authority} format={true} format_type="address" className='text-xs' />
                                </span>
                            }
                        </SheetDescription>
                    }

                    {/* FREEZE AUTHORITY */}
                    {
                        token_info && token_info?.freeze_authority &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>FREEZE AUTHORITY</span>

                            {token_info?.freeze_authority && 
                                <span className='text-xs'>
                                    <CopyTextComponent text={token_info?.freeze_authority} format={true} format_type="address" className='text-xs' />
                                </span>
                            }
                        </SheetDescription>
                    }

                    {/* TOKEN PROGRAM */}
                    {
                        token_info && token_info?.freeze_authority &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>TOKEN PROGRAM</span>

                            {token_info?.token_program && 
                                <span className='text-xs'>
                                    <CopyTextComponent text={token_info?.token_program} format={true} format_type="text" className='text-xs' />
                                </span>
                            }
                        </SheetDescription>
                    }

                    {/* BALANCE */}
                    {
                        token_info && token_info?.balance &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>BALANCE</span>

                            {token_info?.balance && 
                                <span className='text-xs'>
                                { calculateBalance(token_info?.balance, token_info?.decimals) } { token_info?.symbol }                                
                                </span>
                            }
                        </SheetDescription>
                    }

                    {/* DECIMAL */}
                    {
                        token_info && token_info?.decimals &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>DECIMAL</span>
                            <span className='text-xs'>{token_info?.decimals}</span>                    
                        </SheetDescription>
                    }

                    {/* SUPPLY */}
                    {
                        token_info && token_info?.supply &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>SUPPLY</span>
                            <span className='text-xs'>{token_info?.supply}</span>                    
                        </SheetDescription>
                    }

                    {/* PRICE PER TOKEN */}
                    {
                        token_info?.price_info && token_info?.price_info.price_per_token &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>PRICE PER TOKEN</span>
                            <span className='text-xs'>{token_info?.price_info.price_per_token}</span>                    
                        </SheetDescription>
                    }

                    {/* TOTAL PRICE */}
                    {
                        token_info?.price_info && token_info?.price_info.total_price &&
                        <SheetDescription className='flex flex-col text-justify'>
                            <span className='font-bold'>TOTAL PRICE</span>
                            <span className='text-xs'>{token_info?.price_info.total_price}</span>                    
                        </SheetDescription>
                    }

                    { asset?.creators && asset?.creators?.length > 0 && 
                    <SheetDescription>

                    {/* CREATORS */}
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>CREATORS</AccordionTrigger>
                            <AccordionContent>
                            {
                                asset?.creators?.map((creator, index) => (
                                    <div key={index} className='text-xs'>
                                        <span>
                                            <CopyTextComponent text={creator.address} format={true} format_type="address" className='text-xs' />                                
                                        </span>
                                        <span>SHARE: {creator.share}</span>
                                    </div>
                                ))
                            }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    
                    </SheetDescription>
                    }

                </SheetHeader>
            </SheetContent>
        </Sheet>   
    )
}

export default TokenInformationComponent
