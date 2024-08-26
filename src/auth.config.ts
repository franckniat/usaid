import type { NextAuthConfig } from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from '@/functions/user';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/schemas/user';

export const authConfig = {
    providers: [
        Credentials({
            credentials:{
                email:{},
                password:{}
            },
            authorize: async (credentials) => {
                const parsedCredentials = LoginSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                return null;
            }
        }),
    ],
} satisfies NextAuthConfig;