import { DataTableAgencies } from "@/components/data/agencies";
import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import { getAgencies } from "@/functions/agency";
import { Agency } from "@prisma/client";
import React from "react";

export default async function AgencyPage() {
	const agencies = await getAgencies();
	return (
		<DashboardWrapper
			title="Liste des agences"
			message="Gérer vos agences et leurs informations"
			path={[
				{ name: "Agences", href: "/dashboard/agency" },
			]}
		>
			<div className="my-4">
				<DataTableAgencies data={agencies as Agency[]}/>
			</div>
		</DashboardWrapper>
	);
}