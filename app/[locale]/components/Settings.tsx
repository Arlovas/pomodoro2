import { CogIcon } from '@heroicons/react/24/outline'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SettingsForm from './SettingsForm'
import { useTranslations } from 'next-intl'

export default function Settings() {
    const t = useTranslations('settings');

    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex w-6">
                    <CogIcon />
                </div>
            </SheetTrigger >
            <SheetContent className='bg-secondaryBgColor'>
                <SheetHeader>
                    <SheetTitle>{t('title')}</SheetTitle>
                    <SheetDescription>
                        {t('subtitle')}
                    </SheetDescription>
                </SheetHeader>
                <SettingsForm />
            </SheetContent>
        </Sheet>
    )
}