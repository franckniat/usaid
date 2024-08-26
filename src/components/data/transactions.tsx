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
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Transaction } from "@prisma/client";
import { User } from "@prisma/client";
import { Client } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DeleteButton from "@/components/data/delete-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type TransactionData = {
	user: User;
	client: Client;
	transaction: Transaction;
};

export function DataTableTransactions({ data }: { data: TransactionData[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const columns: ColumnDef<TransactionData>[] = [
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
				return <div>Nom du client</div>;
			},
			cell: ({ row }) => (
				<div className="cursor-pointer hover:text-primary font-bold">
					<Link
						href={`/dashboard/projects/${row.original.transaction.id}`}
					>
						{row.original.client.firstname}{" "}
						{row.original.client.lastname}
					</Link>
				</div>
			),
		},
		{
			accessorKey: "description",
			header: ({ column }) => {
				return <div>Montant</div>;
			},
			cell: ({ row }) => (
				<p className="line-clamp-1 max-w-sm">
					{row.original.transaction.amount}
				</p>
			),
		},
		{
			accessorKey: "start",
			header: () => <div>Date de création</div>,
			cell: ({ row }) => (
				<>
					{row.original.transaction.createdAt.toLocaleDateString(
						"fr-FR",
						{
							day: "numeric",
							month: "numeric",
							year: "numeric",
						}
					) +
						" - " +
						row.original.transaction.createdAt.toLocaleTimeString(
							"fr-FR",
							{
								hour: "2-digit",
								minute: "2-digit",
							}
						)}
				</>
			),
		},
		{
			accessorKey: "end",
			header: () => <div>Date de modification</div>,
			cell: ({ row }) => (
				<>
					{row.original.transaction.updatedAt.toLocaleDateString(
						"fr-FR",
						{
							day: "numeric",
							month: "numeric",
							year: "numeric",
						}
					) +
						" - " +
						row.original.transaction.updatedAt.toLocaleTimeString(
							"fr-FR",
							{
								hour: "2-digit",
								minute: "2-digit",
							}
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
								href={`/dashboard/collects/${row.original.transaction.id}`}
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
					placeholder="Recherchez une transaction ..."
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
                <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>
                            Nouvelle transaction
                            <ChevronDown size={15}/>
                        </Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-40">
						<DropdownMenuItem asChild>
                            <Link href={"/dashboard/transactions/new?defaultType=deposit"}>
                                Nouveau dépôt
                            </Link>
                        </DropdownMenuItem>
						<DropdownMenuItem asChild>
                            <Link href={"/dashboard/transactions/new?defaultType=withdraw"}>
                                Nouveau retrait
                            </Link>
                        </DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
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
									Aucune transaction trouvée.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4 gap-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} sur{" "}
					{table.getFilteredRowModel().rows.length} transactions
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
