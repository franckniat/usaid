import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getCurrentUser } from '@/lib/user';
import Preferences from "@/components/dashboard/preferences";
import { ProfileForm } from "@/components/dashboard/profil-form";
import { User } from "@prisma/client";

export default async function SettingsPage() {
	const user = await getCurrentUser();
	return (
		<DashboardWrapper
			title="Paramètres"
			message="Gérer les paramètres de votre compte"
			path={[
				{ name: "Paramètres", href: "/dashboard/settings" },
			]}
		>
			<Tabs defaultValue="profile" className="my-3">
                <TabsList>
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="preferences">Préférences</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileForm user={user as User} />
                </TabsContent>
                <TabsContent value="preferences">
                    <Preferences />
                </TabsContent>
            </Tabs>
		</DashboardWrapper>
	);
}
