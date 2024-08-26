"use client"
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormFooter from "@/components/auth/form-footer";
import { FormError } from "@/components/ui/form-error";
import {zodResolver} from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/user";
import { login } from "@/functions/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm(){
    const [error, setError] = useState<string|undefined>();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();
    const urlError = searchParams.get("error")=== "OAuthAccountNotLinked" ? "Email déjà utilisé chez un autre fournisseur d'authentification !":"";
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError("");
        startTransition(()=>{
           login(data).then((res)=>{
            setError(res?.error);
            router.push("/dashboard");
           })
        })
    }
    return (
        <div className="space-y-3 flex flex-col">
            <h1 className="text-2xl font-bold">Connectez-vous</h1>
            <p className="text-foreground/60">Entrez vos informations.</p>
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Email : </FormLabel>
                            <FormControl>
                                <Input type="email" disabled={isPending} placeholder="exemple@xyz.com"
                                       id="email" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm"/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Mot de passe : </FormLabel>
                            <FormControl>
                                <Input type="password" disabled={isPending} placeholder="**********"
                                       id="password" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm"/>
                        </FormItem>
                    )}/>
                    <FormError message={error || urlError}/>
                    <Button className="w-full" disabled={isPending}>Connectez vous</Button>
                </form>
            </Form>
            <FormFooter backHref={"/auth/register"} backMessage={"Vous n'avez pas encore de compte ?"}/>
        </div>
    )
}