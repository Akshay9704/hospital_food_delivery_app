"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface GlobalContextType {
  isAuthUser: boolean | null;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>; 
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); 

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}") as UserData; 
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
