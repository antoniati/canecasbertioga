import { User } from "@prisma/client";
import { createContext } from "react";

type UserContextType = {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);