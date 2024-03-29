import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/flow/login",
    },
    callbacks: {
        jwt({ token }) {
            console.log("auth.ts jwt", token);
            return token;
        },
        session({ session, newSession, user, token }) {
            if (token && token.sub && session.user) {
                session.user = { ...session.user, id: token.sub } as any;
            }
            console.log("auth.ts session", session, newSession, user);
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                    loginHint: "${HINT}",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "Strict",
                path: "/",
                secure: true,
            },
        },
    },
};
