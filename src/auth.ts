// Import NextAuth for authentication handling and PrismaAdapter to connect NextAuth with Prisma
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client"; // Enum for user roles in Prisma
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

import authConfig from "@/auth.config"; // Additional auth configuration
import { db } from "@/lib/prismadb"; // Custom import for database connection
import { getTwoFactorConfirmationByUserId } from "@/services/read/getTwofactor";
import { getUserById } from "@/services/read/getUsers"; // Custom actions for fetching user data

// Configure NextAuth with custom handlers and authentication strategies
export const {
      handlers: { GET, POST }, // HTTP methods supported by this NextAuth configuration
      auth, // Main authentication object
      signIn, // Function for signing in users
      signOut, // Function for signing out users
} = NextAuth({
      pages: {
            signIn: "/auth/login", // Custom sign-in page
            error: "/auth/error", // Custom error page for authentication errors
      },

      // Event handling for various NextAuth events, like linking accounts
      events: {
            async linkAccount({ user }) {
                  // This event is triggered when a user links a new account (e.g., OAuth)
                  // We mark the email as verified when an account is linked
                  await db.user.update({
                        where: { id: user.id },
                        data: { emailVerified: new Date() }, // Set the email verification date
                  });
            },
      },

      // Callback functions to manage different aspects of authentication and sessions
      callbacks: {
            async signIn({ user, account }) {
                  if (account?.provider !== "credentials") return true;

                  const existingUser = await getUserById(user.id); // Fetch the user from the database

                  // Disallow sign-in if the user's email is not verified
                  if (!existingUser?.emailVerified) {
                        return false; // Deny sign-in
                  }

                  // If two-factor authentication is enabled, ensure it is confirmed
                  if (existingUser?.isTwoFactorEnabled) {
                        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                        if (!twoFactorConfirmation) {
                              return false; // Deny sign-in if 2FA is not confirmed
                        }

                        // Delete the confirmation after successful sign-in to ensure it's required each time
                        await db.twoFactorConfirmation.delete({
                              where: { id: twoFactorConfirmation.id },
                        });
                  }

                  return true; // Allow sign-in if all checks pass
            },

            async session({ token, session }: { token: JWT, session: Session }) {
                  // This callback is called when a session is created or updated

                  if (token.sub && session.user) {
                        session.user.id = token.sub; // Set user ID in the session
                  }

                  if (token.role && session.user) {
                        session.user.role = token.role as UserRole; // Set user role in the session
                  }

                  if (typeof token.customerName === "string") {
                        session.user.customerName = token.customerName; // Adiciona o nome do cliente à sessão
                  }

                  if (typeof token.phone === "string") {
                        session.user.phone = token.phone; // Adiciona o telefone à sessão
                  }

                  // Ensure image is a string or null value
                  if (typeof token.image === "string" && session.user) {
                        session.user.image = token.image; // Add the user image to the session
                  }


                  return session; // Return the updated session
            },

            async jwt({ token }: { token: JWT }) {
                  // This callback is called when a JWT (JSON Web Token) is created or updated

                  if (!token.sub) return token; // If there's no user ID in the token, return it

                  const existingUser = await getUserById(token.sub); // Fetch the user from the database

                  if (existingUser) {
                        token.sub = existingUser.id; // Add sub to token
                        token.role = existingUser.role; // Add role to token

                        token.firstName = existingUser.customerName; // Add username to token
                        token.image = existingUser.image; // Sets the user image in the token
                        token.phone = existingUser.phone; // Sets the user image in the token
                  }

                  return token; // Return the updated token
            },
      },

      adapter: PrismaAdapter(db), // Prisma adapter to connect NextAuth with the database
      session: { strategy: "jwt" }, // Use JWT strategy for session management
      ...authConfig, // Additional custom authentication configuration
});