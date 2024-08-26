import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";


interface FormWrapperProps {
    children: React.ReactNode;
    message?: string;
}

export default function FormWrapper({ message, children}: FormWrapperProps) {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-primary dark:from-primary/90 via-gray-50 dark:via-slate-800 to-gray-300 dark:to-slate-950">
            <Card className="px-2 sm:px-0">
                <CardContent>
                    <div className="grid grid-cols-2 gap-5 divide-x ">
                        <div className="space-y-3 justify-center flex flex-col">
                            <Link href={"/"}><h1 className="text-3xl font-bold text-primary">U<span className="text-foreground">SAID</span></h1></Link>
                            <p className="mt-3 max-w-xl font-medium text-lg tracking-tight">
                                Bienvenue sur notre plateforme de gestion des collectes
                            </p>
                            <p className="max-w-md text-foreground/60">{message}</p>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="">
                                {children}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
