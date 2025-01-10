"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

// Define the UserData interface with role
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string; // Add role property here
}

interface GlobalContextType {
  isAuthUser: boolean | null;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  userData: UserData | null; // Updated to include role
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>; // Updated to include role
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // Updated type

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}") as UserData; // Cast to UserData
      setUserData(user);
    } else {
      setIsAuthUser(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuthUser,
        setIsAuthUser,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
