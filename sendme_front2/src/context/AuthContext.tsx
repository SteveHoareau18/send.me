"use client";

import {createContext, useContext, useState} from "react";
import axios from "axios";
import {SPRING_URL} from "@/app/page";
import {Account} from "@/context/Account";

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface ConnectData {
    token: string;
    expiringTime: number;
}

interface AuthContextType {
    signupData: SignupData;
    setSignupData: (data: Partial<SignupData>) => void;

    loginData: LoginData;
    setLoginData: (data: Partial<LoginData>) => void;

    connectData: ConnectData;
    setConnectData: (data: Partial<ConnectData>) => void;
    getSession: () => ConnectData | null;

    isAccountValid: () => Promise<boolean>;
    getUserData: () => Promise<Account | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [signupData, setSignupDataState] = useState<SignupData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loginData, setLoginDataState] = useState<LoginData>({
        email: "",
        password: "",
    });

    const [connectData, setConnectDataState] = useState<ConnectData>({
        token: "",
        expiringTime: 0,
    });

    const setSignupData = (data: Partial<SignupData>) => {
        setSignupDataState((prev) => ({...prev, ...data}));
    };

    const setLoginData = (data: Partial<LoginData>) => {
        setLoginDataState((prev) => ({...prev, ...data}));
    };

    const setConnectData = (data: Partial<ConnectData>) => {
        setConnectDataState((prev) => ({...prev, ...data}));
        localStorage.setItem("account", JSON.stringify(data));
    };

    const getSession = (): ConnectData | null => {
        if (typeof window === "undefined") return null;
        return JSON.parse(localStorage.getItem("account") || "null");
    };


    const getUserData = async (): Promise<Account | null> => {
        const session = getSession();
        if (!session?.token) return null;

        try {
            const response = await axios.get(`${SPRING_URL}/users/me`, {
                headers: {Authorization: `Bearer ${session.token}`},
            });
            return response.data;
        } catch (error) {
            console.error("Erreur récupération utilisateur :", error);
            return null;
        }
    };

    const isAccountValid = async (): Promise<boolean> => {
        return (await getUserData()) !== null;
    };


    return (
        <AuthContext.Provider
            value={{
                signupData,
                setSignupData,
                loginData,
                setLoginData,
                connectData,
                setConnectData,
                isAccountValid,
                getUserData,
                getSession
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};