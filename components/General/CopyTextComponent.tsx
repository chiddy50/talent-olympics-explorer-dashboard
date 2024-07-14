"use client";

import { Copy } from 'lucide-react'
import { copyToClipboard, truncateAddress, truncateString } from '@/lib/helper';
import { cn } from '@/lib/utils';

function CopyTextComponent({ 
    className, text, format, format_type = 'string' 
}: { 
    className?: string, text: string, format: boolean, format_type?: string | null 
}) {
    return (
        <span className={cn(
            className,
            " text-blue-500 gap-2 flex items-center"
        )}>
            <span className='cursor-pointer'>
                { format && format_type === 'text' && truncateString(text) }
                { format && format_type === 'address' && truncateAddress(text) }
                { !format && text }
            </span>

            <Copy onClick={() => copyToClipboard(text)} className='h-4 w-4 hover:text-blue-400 cursor-pointer'/>
        </span>
    )
}

export default CopyTextComponent
