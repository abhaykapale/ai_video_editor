import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./dbconnection";
import User from "@/models/user";
import bcrypt from "bcrypt"

export const authOptions:NextAuthOptions = {

    providers: [
       
        //CUSTOM CREDENTIAL CHECK LOGIC
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                
                if(!credentials?.email || !credentials?.password)
                    throw new Error("EMAIL AND PASSWORD ARE REQUIRED");

                try {
    
                    await connectToDatabase();
                   const Isuser = await User.findOne({email: credentials.email, password: credentials.password});
                    
                   if(!Isuser) throw new Error("NO user fouund with this email");

                   const isValid = await bcrypt.compare(credentials.password,Isuser.password)
                  
                   if(!isValid) throw new Error("Invalid Password");
                   

                   return {
                    id: Isuser._id.toString(),
                    email :Isuser.email

                   }

                } catch (error) {
                    console.error("Auth error: " ,error)
                    throw new Error("FAILED TO CONNECT TO DATABASE");
                }
            }
        })   
    
  ],

  callbacks: {
        //   async signIn({ user, account, profile, email, credentials }) {
        //     return true
        //   },
        //   async redirect({ url, baseUrl }) {
        //     return baseUrl
        //   },

        async jwt({ token, user}) {
            token.id= user.id;
            return token
        },

        async session({ session, token }) {

        if(session.user)
            session.user.id=token.id as string ;

        return session
        },


        },

    pages: {
        signIn: '/login',
        error: '/login', // Error code passed in query string as ?error=
        //   signOut: '/auth/signout',
        //   verifyRequest: '/auth/verify-request', // (used for check email message)
        //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    session: {
       
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // secret :process.env.AUTH_SECRET

};

