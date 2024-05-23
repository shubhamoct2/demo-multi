// imports
import NextAuth, { AuthOptions } from "next-auth";

// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "@/components/ui/use-toast";
import { cookies } from "next/headers";
import AuthService from "@/services/auth/auth.service";
import Axios from "@/lib/core/http";
import API_ENDPOINTS from "@/lib/core/endpoints";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "example@e.cc" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any, type: any) {
        if (credentials == null) return null;
        const authCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const userResponse = await Axios.post(
            API_ENDPOINTS.LOGIN,
            authCredentials
          );
          if (userResponse?.data?.status == 409) {
            cookies().set("message", userResponse?.data?.message);
            cookies().set("verify", userResponse?.data?.message);
            cookies().set("status", userResponse?.data?.status);
            return null;
          }
          if (
            typeof userResponse !== "undefined" &&
            userResponse?.data?.status == 200
          ) {
            const { data } = userResponse?.data;
            const responseData = { ...data.user, apiToken: data.token };
            cookies().set("apiToken", data?.token);
            return responseData;
          } else {
            return null;
          }
        } catch (error) {
          // If there's an error during authorization, return the error message
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data.message;
            return Promise.reject(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject("No response from server.");
          } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject("Error setting up request.");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  jwt: {
    // JWT encoding and decoding configurations
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log(session, "SESSION");
      console.log(token, "token");
      console.log(user, "user");

      const senitizedToken = {
        user_id: token?.id,
        name: token?.name,
        email: token?.email,
        status: token?.status,
      };
      const tokenWithUser = {
        ...session,
        user: senitizedToken,
        apiToken: token.apiToken,
      };
      return tokenWithUser;
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user as JWT;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login", // Custom sign-in page
  },
  debug: true,
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
