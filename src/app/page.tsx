import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<div className="h-dvh flex flex-col gap-5 justify-center items-center">
			Todo: Landing Page
			<Link href={"/dashboard"}>
				<Button>Accéder au tableau de bord</Button>
			</Link>
		</div>
	);
}
