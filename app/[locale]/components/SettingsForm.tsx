"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useTranslations } from "next-intl"

const FormSchema = z.object({
    pomodoroTime: z
        .string()
        .transform((value) => parseInt(value, 10)) // Convert to number
        .refine((value) => Number.isInteger(value) && value >= 1 && value <= 59, {
            message: "Pomodoro time must be an integer between 1 and 59.",
        }),
    breakTime: z
        .string()
        .transform((value) => parseInt(value, 10)) // Convert to number
        .refine((value) => Number.isInteger(value) && value >= 1 && value <= 59, {
            message: "Break time must be an integer between 1 and 59.",
        }),
})

export default function SettingsForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pomodoroTime: "25",
            breakTime: "5"
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            className: "bg-toastBgColor border-none shadow-submit",
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] bg-neutral-800 rounded-md p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const t = useTranslations('settings');

    return (
        <div className="mt-12">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="pomodoroTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('pomodoro')}</FormLabel>
                                <FormControl>
                                    <Input type="number" className="border-neutral-600" {...field} />
                                </FormControl>
                                <FormDescription>{t('work_time_usually')}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="breakTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('break')}</FormLabel>
                                <FormControl>
                                    <Input type="number" className="border-neutral-600" {...field} />
                                </FormControl>
                                <FormDescription>{t('rest_time')}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{t('submit')}</Button>
                </form>
            </Form>
        </div>
    )
}
