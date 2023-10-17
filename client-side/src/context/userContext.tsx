import React, {createContext, ReactNode, useContext, useState} from 'react';

interface UserContextProps {
    isLoggedIn: boolean;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    const login = (token: string, username: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
        <UserContext.Provider value={{isLoggedIn, username, login, logout, setUsername}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
