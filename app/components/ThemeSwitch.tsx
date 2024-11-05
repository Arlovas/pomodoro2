// app/components/ThemeSwitch.tsx
'use client'

import { SunIcon, MoonIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <HeartIcon className='select-none' />
    )

    if (resolvedTheme === 'dark') {
        return <SunIcon onClick={() => setTheme('light')} className='select-none' />
    }

    if (resolvedTheme === 'light') {
        return <MoonIcon onClick={() => setTheme('dark')} className='select-none' />
    }
}
