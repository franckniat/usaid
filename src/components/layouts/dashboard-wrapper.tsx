import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface DashboardWrapperProps {
	children: React.ReactNode;
	title: string;
	message?: string;
	className?: string;
	path : {
		name: string;
		href: string;
	}[];
}

export default function DashboardWrapper({
	children,
	title,
	message,
	path,
	className,
}: DashboardWrapperProps) {
	return (
		<div className={`space-y-3 ${className}`}>
			<CustomBreadcrumb
				path={[
					{
						name: "Tableau de bord",
						href: "/dashboard",
					},
					...path,
				]}
			/>
			<h1 className="text-xl font-semibold">{title}</h1>
			<p className="text-sm font-medium text-foreground/50">{message}</p>
			{children}
		</div>
	);
}
