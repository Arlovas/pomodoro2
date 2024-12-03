import { CogIcon } from '@heroicons/react/24/outline'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Settings() {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex w-6">
                    <CogIcon />
                </div>
            </SheetTrigger >
            <SheetContent className='bg-secondaryBgColor border-none'>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}