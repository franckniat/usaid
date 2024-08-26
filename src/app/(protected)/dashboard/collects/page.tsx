import { DataTableCollects } from "@/components/data/collects";
import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import React from "react";

export default async function CollectPage() {
	return (
		<DashboardWrapper
			title="Collectes récentes"
			message="Gérer les collectes récentes de vos clients" 
			path={[
				{ name: "Collectes", href: "/dashboard/collectes" },
			]}
		>
			<div className="my-4">
				<DataTableCollects data={[]}/>
			</div>
		</DashboardWrapper>
	);
}