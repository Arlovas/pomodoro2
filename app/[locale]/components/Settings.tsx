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

export default function Settings() {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex w-6">
                    <CogIcon />
                </div>
            </SheetTrigger >
            <SheetContent className='bg-secondaryBgColor'>
                <SheetHeader>
                    <SheetTitle>Pomodoro settings</SheetTitle>
                    <SheetDescription>
                        Configure the pomodoro as best suites your needs
                    </SheetDescription>
                </SheetHeader>
                <SettingsForm />
            </SheetContent>
        </Sheet>
    )
}