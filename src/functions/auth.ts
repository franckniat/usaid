"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, RegisterSchema } from "@/schemas/user";
import { getUserByEmail } from "./user";
import bcrypt from 'bcryptjs';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error:"Informations invalides !"
        }
    }
    const {email, password, name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {
            error: "Cet email est déjà utilisé"
        }
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    })
    return{
        success:"Inscription réussie ! Connectez-vous pour continuer."
    }
}

export const login = async (data:z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error:"Les champs sont invalides!"
        }
    }
    const {email, password} = validateFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    }catch (error){
        if(error instanceof AuthError){
            if (error.cause?.err instanceof Error) {
                return {
                    error: error.cause.err.message
                };
            }
            switch (error.type) {
                case "CredentialsSignin":
                    return {error:"Email ou mot de passe incorrect ! "}
                case "AccessDenied":
                    return {error:"Accès refusé !"}
                default:
                    return {error:"Something went wrong !"}
            }
        }
        throw error;
    }
}

export const logOut = async () =>{
    await signOut({
        redirectTo: "/auth/login"
    });
}