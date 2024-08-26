"use client"
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "../ui/button";
import * as Icon from "lucide-react";
import { Input } from "../ui/input";
import "./layout.scss";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
	const { theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = React.useState<string>("");
	React.useEffect(() => {
		if (theme) {
			setCurrentTheme(theme as string);
		}
	}, [theme, currentTheme]);
	return (
		<nav className="header fixed top-0 right-0 border-b border-foreground/10 bg-background/90 backdrop-blur">
			<div className="flex justify-between items-center gap-3 px-5 h-[65px]">
				<form className="flex gap-2">
					<Input
						placeholder="Faites une recherche ..."
						className=""
					/>
					<Button type="submit">Rechercher</Button>
				</form>
				<div className="flex gap-3 items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"ghost"} size={"icon"}>
								<Icon.Plus size={18} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-40">
							<DropdownMenuItem asChild>
								<Link href={"/dashboard/clients/new"}>Nouveau client</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={"/dashboard/clients/new"}>Nouveau dépôt</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href={"/dashboard/clients/new"}>Nouveau retrait</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button
						size={"icon"}
						variant={"ghost"}
						className="relative"
						onClick={() => {
							setTheme(theme === "dark" ? "light" : "dark");
						}}
					>
						<Icon.Moon
							size={18}
							className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 absolute"
						/>
						<Icon.Sun
							size={18}
							className="scale-100 dark:scale-0 rotate-0 dark:rotate-45"
						/>
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						className="relative"
					>
						<Icon.Bell size={18} />
						<span className="bg-primary text-xs p-0.5 rounded-full absolute right-0 top-0 w-2 h-2 animate-bounce"></span>
					</Button>
				</div>
			</div>
		</nav>
	);
}
