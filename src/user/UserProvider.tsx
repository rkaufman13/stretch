import { User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  },
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();

  const isBasePath = pathname === "/";

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>{user ? children : isBasePath ? children : <Navigate to="/" />}</>
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(UserContext);