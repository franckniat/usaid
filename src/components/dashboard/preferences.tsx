"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DashboardFormWrapper from "./dashboard-form-wrapper";
  

export default function Preferences() {
    const {theme, setTheme} = useTheme();
    return (
        <>
            <DashboardFormWrapper
                title="Modifier vos préférences"
                headerMessage="Personnalisez votre expérience utilisateur."
                className="mt-3 flex flex-col gap-6"
            >
                <div className="space-y-3">
                    <h1 className="text-sm font-medium">Thème : </h1>
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <div className="px-3 flex items-center gap-2">
                            <div className="relative flex items-center">
                                <Sun className="scale-100 dark:scale-0 rotate-0 dark:rotate-45 transition-transform"
                                     size={20}/>
                                <Moon
                                    className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition-transform absolute"
                                    size={20}/>
                            </div>
                            <Switch
                                checked={theme === "dark"}
                                onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3 max-w-lg mt-3">
                    <h1 className="text-sm font-medium">Langue : </h1>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisissez une langue"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">🇫🇷Français</SelectItem>
                            <SelectItem value="en">🇺🇸Anglais</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
            </DashboardFormWrapper>
        </>
    );
}
