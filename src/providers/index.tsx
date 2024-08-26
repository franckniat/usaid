import React from "react";

import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "./theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<ThemeProvider attribute="class" enableSystem defaultTheme="dark" disableTransitionOnChange>
				<Toaster richColors closeButton={true} />
				{children}
			</ThemeProvider>
		</SessionProvider>
	);
}
