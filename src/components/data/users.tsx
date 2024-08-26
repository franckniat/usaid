"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { User } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DeleteButton from "@/components/data/delete-button";

export function DataTableUsers({ data }: { data: User[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const columns: ColumnDef<User>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "title",
			header: ({ column }) => {
				return <div>Nom</div>;
			},
			cell: ({ row }) => (
				<div className="cursor-pointer hover:text-primary font-bold">
					<Link href={`/dashboard/projects/${row.original.id}`}>
						{row.original.name}
					</Link>
				</div>
			),
		},
		{
			accessorKey: "description",
			header: ({ column }) => {
				return <div>Email</div>;
			},
			cell: ({ row }) => (
				<p className="line-clamp-1 max-w-sm">{row.original.email}</p>
			),
		},
		{
			accessorKey: "start",
			header: () => <div>Date d&#39;inscription</div>,
			cell: ({ row }) => (
				<>
					{row.original.createdAt.toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					}) +
						" - " +
						row.original.createdAt.toLocaleTimeString("fr-FR", {
							hour: "2-digit",
							minute: "2-digit",
						})}
				</>
			),
		},
		{
			accessorKey: "end",
			header: () => <div>Date de modification</div>,
			cell: ({ row }) => (
				<>
					{row.original.updatedAt.toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					}) +
						" - " +
						row.original.updatedAt.toLocaleTimeString("fr-FR", {
							hour: "2-digit",
							minute: "2-digit",
						})}
				</>
			),
		},
		{
			accessorKey: "end",
			header: () => <div>Rôle</div>,
			cell: ({ row }) => (
				<>
					{row.original.role === "manager" && (
						<span className="text-sky-600 flex items-center gap-3">
							<span className="w-3 h-3 bg-sky-600 rounded-full"></span>
							Employé
						</span>
					)}
					{row.original.role === "admin" && (
						<span className="text-green-600 flex items-center gap-3">
							<span className="w-3 h-3 bg-green-600 rounded-full"></span>
							Administrateur
						</span>
					)}
				</>
			),
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				return (
					<>
						<div className="flex gap-2">
							<Link
								href={`/dashboard/users/${row.original.id}`}
							>
								<Button size={"icon"} variant={"secondary"}>
									<Pencil1Icon />
								</Button>
							</Link>
							<DeleteButton
								contentButton={<Trash2 size={16} />}
								handleDelete={() => {}}
							/>
						</div>
					</>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	table.getState().pagination.pageSize = 10;
	return (
		<div className="w-full">
			<div className="flex items-center justify-between py-4 gap-3">
				<Input
					placeholder="Recherchez un utilisateur ..."
					value={
						(table
							.getColumn("title")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("title")
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border border-foreground/10">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-foreground/60"
								>
									Aucun utilisateur trouvé.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4 gap-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} sur{" "}
					{table.getFilteredRowModel().rows.length} utilisateurs
					sélectionnées.
				</div>
				<div className="text-sm text-foreground/20">
					Page {table.getState().pagination.pageIndex + 1} sur{" "}
					{table.getPageCount()}
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Précedent
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Suivant
					</Button>
				</div>
			</div>
		</div>
	);
}
