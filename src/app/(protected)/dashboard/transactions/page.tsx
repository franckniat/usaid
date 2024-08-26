import { DataTableTransactions } from "@/components/data/transactions";
import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import React from "react";

export default async function TransactionsPage() {
	return (
		<DashboardWrapper
			title="Transactions récentes"
			message="Gérer les transactions récentes de vos clients"
			path={[
				{ name: "Transactions", href: "/dashboard/transactions" },
			]}
		>
			<div className="my-4">
				<DataTableTransactions data={[]}/>
			</div>
		</DashboardWrapper>
	);
}