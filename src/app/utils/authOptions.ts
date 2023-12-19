import { mergeAnonymousAndUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: {},
              password: {}
            },
            async authorize(credentials, req) {

              console.log({credentials});
              const user = await prisma.user.findFirst({
                where: { email: credentials?.email }
              });
              console.log({user});

              if(user)
              {
                console.log('User returned')
                return user;
              }
              else 
              return null;
            }
          }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        session({session, user}){
            console.log('Session generated')
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