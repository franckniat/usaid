"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <ProgressBar
                options={{ showSpinner: false }}
                height="2.5px"
                color="#22c55e"
            />
            {children}
        </NextThemesProvider>
    );
}