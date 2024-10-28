import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';

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
            <body className={` ${GeistSans.className} antialiased bg-zinc-900`}>
                {children}
            </body>
        </html>
    );
}
