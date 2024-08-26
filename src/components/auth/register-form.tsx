"use client";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormFooter from "@/components/auth/form-footer";
import { FormError } from "@/components/ui/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/user";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { register } from "@/functions/auth";
import { FormSuccess } from "@/components/ui/form-success";
import { useSearchParams } from "next/navigation";
export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(data).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            });
        });
    };
    return (
        <div className="space-y-3 flex flex-col">
            <h1 className="text-2xl font-bold">Inscrivez-vous</h1>
            <p className="text-foreground/60">Entrez vos informations.</p>
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Nom : </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        disabled={isPending}
                                        placeholder="Franck Niat"
                                        id="name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email : </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        disabled={isPending}
                                        placeholder="exemple@xyz.com"
                                        id="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">Mot de passe : </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        disabled={isPending}
                                        placeholder="**********"
                                        id="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <FormControl>
                            <Checkbox
                                id={"terms"}
                                defaultChecked
                                disabled={isPending}
                                required
                            />
                        </FormControl>
                        <FormLabel htmlFor="terms" className={"flex items-center gap-2"}>
                            Accepter les termes et conditions d{"'"}utilisation.
                            <Link
                                href={"/terms"}
                                className={"text-foreground/40 text-sm hover:underline"}
                            >
                                En savoir plus
                            </Link>
                        </FormLabel>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className="w-full" disabled={isPending}>
                        Créer votre compte
                    </Button>
                </form>
            </Form>
            <FormFooter
                backHref={"/auth/login"}
                backMessage={"Vous avez déjà un compte ?"}
            />
        </div>
    );
}
