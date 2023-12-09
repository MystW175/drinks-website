import { mergeAnonymousAndUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { label: "Email", type:"email", placeholder:"jsmith@example.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const user = await prisma.user.findUnique({
                where: { email: credentials?.email},
              })
              if (user) {
                return user;
              } else {
                return null;
              }
            }
          }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        session({session, user}){
            session.user.id = user.id;
            return session;
        },
    },
    events: {
        async signIn({user}){
            await mergeAnonymousAndUserCart(user.id);
        },
    },
};