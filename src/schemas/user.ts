import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email().min(1, {
        message: "Veuillez entrer un email valide !"
    }),
    password: z.string().min(1, {
        message: "Veuillez entrer un mot de passe !"
    }),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Veuillez entrer un nom !"
    }),
    email: z.string().email({
        message: "Veuillez entrer un email valide !"
    }).min(1, {
        message: "Veuillez entrer un email !"
    }),
    password: z.string().
        min(1,{
            message: "Veuillez entrer un mot de passe !"
        })
        .max(32,{
            message: "Le mot de passe doit contenir au plus 32 caractères."
        })
        .refine((val) => val.length >= 8, {
                message: "Le mot de passe doit contenir au moins 8 caractères."
            }
        )
        .refine((val) => val.match(/[a-z]/i), {
            message: "Le mot de passe doit contenir au moins une lettre."
        })
        .refine((val) => val.match(/[0-9]/), {
            message: "Le mot de passe doit contenir au moins un chiffre."
        })
        .refine((val) => val.match(/[^a-zA-Z\d]/), {
            message: "Le mot de passe doit contenir au moins un caractère spécial."
        })
    ,
})

export const ProfileUpdateSchema = z.object({
    name: z.optional(z.string().min(1,{
        message:"Veuillez entrer un nom !"
    })),
    image: z.optional(z.string()),
})