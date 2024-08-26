import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import React from "react";
import { DataTableClients } from "@/components/data/clients";

export default async function page() {
	return (
		<DashboardWrapper
			title="Liste des clients"
			message="Gérer les clients"
			path={[
				{ name: "Clients", href: "/dashboard/clients" },
			]}
		>
			<div className="my-4">
				<DataTableClients data={[]} />
			</div>
		</DashboardWrapper>
	);
}
