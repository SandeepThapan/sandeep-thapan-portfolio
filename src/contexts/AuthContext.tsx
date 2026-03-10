import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'employee';

interface User {
    email: string;
    role: UserRole;
}  

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static credentials
const CREDENTIALS = [
    {
        email: 'Anuj@dailytask.com',
        password: 'Goaljob',
        role: 'employee' as UserRole,
    },
    {
        email: 'admin@dailytask.com',
        password: 'AdminPass123',
        role: 'admin' as UserRole,
    },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        const credential = CREDENTIALS.find(
            (cred) => cred.email === email && cred.password === password
        );

        if (credential) {
            const userData = { email: credential.email, role: credential.role };
            setUser(userData);
            localStorage.setItem('authUser', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
