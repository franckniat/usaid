import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authConfig } from "@/auth.config";
import { getUserById } from "@/functions/user";
import type { NextAuthConfig } from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from '@/functions/user';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/schemas/user';


const prisma = PrismaAdapter(db)

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            if (token.image && session.user) {
                session.user.image = token.image as string;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const user = await getUserById(token.sub);
            if (!user) return token;
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            token.role = user.role;
            token.image = user.image;
            return token;
        },
    },
    adapter: prisma,
    session: {
        strategy: "jwt",
    },
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
})