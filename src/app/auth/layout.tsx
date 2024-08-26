
import FormWrapper from "@/components/auth/form-wrapper";
import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Identifiez vous",
    description: "Inscrivez-vous ou connecter vous à votre compte.",
};

export default function AuthLayout ({children}:{children:React.ReactNode}){
    return (
        <>
            <FormWrapper
                message="Identifiez et bénéficiez des fonctionnalités mises à votre disposition."
            >
                {children}
            </FormWrapper>
        </>
    )
}