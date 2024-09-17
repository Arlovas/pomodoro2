import type { Metadata } from "next";
import "./globals.css";
import { ubuntu } from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: "Pomodovas",
    description: "Pomodoro timer from Arlovas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.className} antialiased bg-zinc-900`}>
                {children}
            </body>
        </html>
    );
}
