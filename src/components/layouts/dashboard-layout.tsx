import SideBar from "@/components/layouts/sidebar";
import Header from "./header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SideBar />
			<Header />
			<div className="dashboard_children pt-[75px]">
				<div className="py-5 px-5">{children}</div>
			</div>
		</>
	);
}
