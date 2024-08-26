"use client";

import "./layout.scss";
import { Button } from "../ui/button";
import * as Icon from "lucide-react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { signOut } from "@/auth";
import { logOut } from "@/functions/auth";

export default function SideBar() {
	const pathname = usePathname();
	const { data: session, update, status } = useSession();
	const user = session?.user as User;
	const sideLinks = [
		{
			title: "Tableau de bord",
			href: "/dashboard",
			icon: <Icon.LayoutDashboard size={18} strokeWidth={1.5} />,
		},
		{
			title: "Clients",
			href: "/dashboard/clients",
			icon: <Icon.Users size={18} strokeWidth={1.5} />,
		},
		{
			title: "Collectes",
			href: "/dashboard/collects",
			icon: <Icon.HandCoins size={18} strokeWidth={1.5} />,
		},
		{
			title: "Transactions",
			href: "/dashboard/transactions",
			icon: <Icon.ArrowRightLeft size={18} strokeWidth={1.5} />,
		},
		{
			title: "Nos agences",
			href: "/dashboard/agency",
			icon: <Icon.Globe size={18} strokeWidth={1.5} />,
		},
		{
			title: "Utilisateurs",
			href: "/dashboard/users",
			icon: <Icon.Users size={18} strokeWidth={1.5} />,
		},
		{
			title: "Paramètres",
			href: "/dashboard/settings",
			icon: <Icon.Settings size={18} strokeWidth={1.5} />,
		},
	];
	const sideToggle = useRef<HTMLButtonElement>(null);
	const handleSidebarToggle = () => {
		document.querySelector(".sidebar")?.classList.toggle("active");
		document.querySelector(".header")?.classList.toggle("active");
		document
			.querySelector(".dashboard_children")
			?.classList.toggle("active");
	};

	useEffect(() => {
		sideToggle.current?.addEventListener("click", handleSidebarToggle);
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			sideToggle.current?.removeEventListener(
				"click",
				handleSidebarToggle
			);
		};
	}, []);

	return (
		<aside className="fixed left-0 sidebar border-r border-foreground/10 bg-background/90 backdrop-blur">
			<div className="flex flex-col justify-between gap-3 p-3 h-screen">
				<div className="space-y-5">
					<div className="flex items-center justify-between">
						<Link
							href={"/"}
							className="font-bold text-2xl ml-2 logo"
						>
							U<span className="text-primary">SAID</span>
						</Link>
						<Button
							size={"icon"}
							variant={"ghost"}
							className="hamburger"
							ref={sideToggle}
						>
							<span></span>
							<span></span>
							<span></span>
						</Button>
					</div>
					<div className="flex flex-col gap-1 text-sm">
						{sideLinks.map((sideLink, index) => (
							<Link
								href={sideLink.href}
								key={index}
								title={sideLink.title}
								className={`px-4 py-3 sidelink ${
									pathname === sideLink.href &&
									"active bg-foreground/5"
								} hover:bg-foreground/10 rounded-md flex gap-2 items-center`}
							>
								{sideLink.icon}
								<span className="sideText block">
									{sideLink.title}
								</span>
							</Link>
						))}
					</div>
				</div>
				<div className="w-full">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								className="rounded-full gap-3 py-2 items-center justify-between"
								variant={"outline"}
							>
								<Avatar className="m-1">
									<AvatarFallback>
										{user?.name
											?.split(" ")
											.map((name) => name[0])}
									</AvatarFallback>
								</Avatar>
								<span className="text-sm">{user?.name}</span>
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Hello {user?.name}</SheetTitle>
							</SheetHeader>
							<SheetFooter>
								<Button
									variant={"destructive"}
									onClick={() => logOut()}
								>
									Se déconnecter
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</aside>
	);
}
