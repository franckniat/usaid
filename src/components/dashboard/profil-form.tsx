"use client";
import { z } from "zod";
import { ProfileUpdateSchema } from "@/schemas/user";
import React, { useTransition, useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import DashboardFormWrapper from "./dashboard-form-wrapper";
import { updateUser } from "@/functions/user";
import { Trash2 } from "lucide-react";
import { User } from "@prisma/client";

export function ProfileForm({ user }: { user: User }) {
	const { data, update } = useSession();
	const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
		resolver: zodResolver(ProfileUpdateSchema),
		defaultValues: {
			name: user?.name || "",
			image: user?.image || "",
		},
	});

	const [isPending, startTransition] = useTransition();
	const [isPendingDelete, startTransitionDelete] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [file, setFile] = useState<File>();
	const [imageUser, setImageUser] = useState<string>(user.image || "");

	const isAdmin = user?.role === "admin" || user?.role === "superadmin";
	const router = useRouter();

	const handleDeleteImage = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		startTransitionDelete(() => {
			setError("");
			setSuccess("");
			if (!user?.id)
				return setError(
					"Vous devez être connecté pour effectuer cette action !"
				);
			/* deletePhoto(user?.id).then((res) => {
        update();
        setSuccess(res?.success);
      }) */
			router.refresh();
		});
	};

	const handlePhotoUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file?.size > 15242880) {
				return setError(
					"La taille du fichier ne doit pas dépasser 15 Mo."
				);
			}
			const newImg = URL.createObjectURL(file);
			setImageUser(newImg);
			setFile(file);
		}
	};
	const onSubmit = async (
		profileData: z.infer<typeof ProfileUpdateSchema>
	) => {
		startTransition(async () => {
			setError("");
			setSuccess("");
			/* if (file) {
        const fileURL = await getURLofFile(file, `images/users/${data?.user.id}`);
        profileData.image = fileURL;
      } */
			updateUser(profileData).then((res) => {
				update();
				setError(res?.error);
				setSuccess(res?.success);
			});
		});
	};
	return (
		<DashboardFormWrapper
			title="Modifier votre profil"
			headerMessage="Modifiez vos informations personnelles."
			className="mt-3"
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-3xl pb-8"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom : </FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="Franck NIAT"
											type="text"
										/>
									</FormControl>
									<FormMessage className="text-sm" />
								</FormItem>
							)}
						/>
						<div className="space-y-2 w-fit">
							<Label
								className="w-fit cursor-pointer flex gap-2 items-center flex-col"
								htmlFor="user_image"
							>
								Changer votre photo de profil :
								<Avatar
									className={`hover:bg-opacity-80 flex items-center justify-center my-3 w-[100px] h-[100px] ${
										isAdmin
											? "border-4 border-amber-600"
											: "border-none"
									}`}
								>
									{(data?.user && imageUser === "") ||
									imageUser === undefined ||
									imageUser === null ? (
										<AvatarFallback className="font-bold">
											{data?.user.name
												?.charAt(0)
												.toUpperCase()}
										</AvatarFallback>
									) : (
										<AvatarImage
											className="object-cover"
											src={imageUser}
										/>
									)}
								</Avatar>
								{user?.image && (
									<Button
										variant={"destructive"}
										className="group"
										onClick={handleDeleteImage}
										disabled={isPendingDelete}
									>
										<Trash2
											size={18}
											className="group-hover:scale-105"
										/>
										<span className="scale-x-0 hidden group-hover:scale-x-100 group-hover:block origin-left transition-transform">
											Supprimer votre photo
										</span>
									</Button>
								)}
							</Label>
							<Input
								id="user_image"
								className="hidden"
								onChange={handlePhotoUpload}
								disabled={isPending}
								placeholder="Donnez un titre à votre document"
								type="file"
								accept="image/*"
							/>
						</div>
					</div>
					<div className="my-2">
						<FormError message={error} />
						<FormSuccess message={success} />
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="w-full sm:w-fit mt-4"
					>
						Modifier votre profil
					</Button>
				</form>
			</Form>
		</DashboardFormWrapper>
	);
}
