import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { Providers } from "./providers";

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
        // suppressHydrationWarning correct use - https://react.dev/reference/react-dom/components/common#common-props
        <html lang="en" suppressHydrationWarning>
            <body className={` ${GeistSans.className} antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
