import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
      role: UserRole;
      customerName: string;
      phone: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
};

declare module "next-auth" {
      interface Session {
            user: ExtendedUser;
      }
}