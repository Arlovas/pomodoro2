import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                mainText: "var(--main-text)",
                secondaryText: "var(--secondary-text)",
                pomodoroBgColor: "rgba(var(--pomodoro-bg-color))",
            },
        },
    },
    plugins: [],
};
export default config;
