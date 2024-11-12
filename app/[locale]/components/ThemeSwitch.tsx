'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { SunIcon, MoonIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <HeartIcon className='select-none' />
    )

    let icon, tooltipHover;

    if (resolvedTheme === 'dark') {
        tooltipHover = 'Switch to light mode';
        icon = <SunIcon onClick={() => setTheme('light')} className='cursor-pointer select-none' />
    }

    if (resolvedTheme === 'light') {
        tooltipHover = 'Switch to dark mode';
        icon = <MoonIcon onClick={() => setTheme('dark')} className='cursor-pointer select-none' />
    }

    return (
        <TooltipProvider delayDuration={400}>
            <Tooltip>
                <TooltipTrigger asChild>{icon}</TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipHover}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
