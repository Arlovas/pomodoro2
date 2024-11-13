"use client"

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { routing } from '@/i18n/routing'

const frameworks = [
    {
        value: "en",
        label: "🇺🇸 English",
    },
    {
        value: "pt",
        label: "🇧🇷 Portuguese",
    },
]

export default function LanguageSwitch({ locale }: { locale: string }) {
    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(locale)

    const pathName = usePathname();

    /**
     * Constructs a new pathname based on the given locale and current language.
     *
     * Difference in the segment is due to the default locale is omitted from the pathname
     * default en -> /page
     * other langs -> /pt/page
     * The end result is always /[locale]/page
     *
     * @param locale - The target locale to redirect to.
     * @param currentLang - The current language of the pathname.
     * @returns The new pathname with the updated locale.
     */
    const redirectPathName = (locale: string, currentLang: string) => {
        if (!pathName) return '/';

        const segments = pathName.split('/');

        if (currentLang === routing.defaultLocale && locale !== routing.defaultLocale) {
            segments[0] = locale;
        } else {
            segments[1] = locale;
        }

        return segments.join('/');
    }

    // Avoids flickering when in dark mode 
    useEffect(() => setMounted(true), [])
    if (!mounted) return <div className='h-[36px]'></div>;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[170px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select language..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Link href={redirectPathName(framework.value, locale)} className="flex w-full">
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </Link>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
