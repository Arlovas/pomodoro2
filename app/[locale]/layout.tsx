import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { Providers } from "./providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
    title: "Pomodovas",
    description: "Pomodoro timer from Arlovas",
};

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        // suppressHydrationWarning correct use - https://react.dev/reference/react-dom/components/common#common-props
        <html lang={locale} suppressHydrationWarning>
            <body className={` ${GeistSans.className} antialiased`}>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <NavBar locale={locale} />
                        {children}
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
