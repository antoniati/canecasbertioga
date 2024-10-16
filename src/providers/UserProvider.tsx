"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { UserContext } from "@/contexts/UserContext";
import { getUserById } from "@/services/read/getUsers";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const { data: session, status } = useSession();

      const [user, setUser] = useState<User | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<Error | null>(null);

      useEffect(() => {
            if (status === "loading") {
                  return;
            }

            const fetchUserData = async () => {
                  if (session?.user?.id) {
                        try {
                              const userFound = await getUserById(session.user.id);
                              setUser(userFound || null);
                        } catch (err) {
                              setError(err as Error);
                        } finally {
                              setIsLoading(false);
                        }
                  } else {
                        setUser(null);
                        setIsLoading(false);
                  }
            };

            fetchUserData();
      }, [session, status]);

      return (
            <UserContext.Provider value={{ user, isLoading, error }}>
                  {children}
            </UserContext.Provider>
      );
};