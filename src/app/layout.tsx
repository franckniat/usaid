import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const dmsans = DM_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Usaid",
	description: "Application de gestion des collectes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={`${inter.className} antialiased tracking-normal`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
