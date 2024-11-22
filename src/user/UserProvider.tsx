import { User } from 'firebase/auth';
import React, { createContext, ReactNode, useState } from 'react';

export const UserContext = createContext({} as { user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> });

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}