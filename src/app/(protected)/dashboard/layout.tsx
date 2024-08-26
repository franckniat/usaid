import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Usaid | Tableau de bord",
	description: "Application de gestion des collectes",
};

export default function DashboardRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
