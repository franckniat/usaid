import { DataTableTransactions } from "@/components/data/transactions";
import { DataTableUsers } from "@/components/data/users";
import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import React from "react";

export default async function UsersPage() {
	return (
		<DashboardWrapper
			title="Listes des utilisateurs"
			message="Hello Administrateur, gérez les utilisateurs de votre application"
			path={[
				{ name: "Utilisateurs", href: "/dashboard/users" },
			]}
		>
			<div className="my-4">
				<DataTableUsers data={[]}/>
			</div>
		</DashboardWrapper>
	);
}