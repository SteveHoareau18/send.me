"use client";

import { Button } from "@/components/ui/button";
import {Logo} from "@/components/ui/logo";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import { isValidEmail } from "@/context/Verificator";

export default function LoginPage() {
    const router = useRouter();
    const { loginData, setLoginData } = useAuth();
    const [email, setEmail] = useState(loginData.email || "");

    const handleNext = () => {
        if (!email) {
            return alert("Tous les champs sont obligatoires.");
        }

        if(!isValidEmail(email)){
            return alert("Email non valide, il faut que ce soit ce format: xxxxx@xxxxx.xxx");
        }

        setLoginData({ email });
        router.push("/login/password");
    };

    const resetForm = () => {
        setLoginData({ email: "" });
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500">
            <div className="w-[600px] bg-white p-10 rounded-xl shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold mb-2">Connexion</h2>
                <p className="text-gray-500 mb-4">
                    Saisissez votre email
                </p>

                <input
                    type="email"
                    placeholder="Adresse mail"
                    className="mb-3 w-full px-4 py-2 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                />

                <div className="flex justify-between items-center">
                    <Link href="/signup" onClick={resetForm}>
                        <Button className="bg-blue-800 text-white px-6 py-2 rounded-lg">S&#39;inscrire</Button>
                    </Link>
                    <Button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Suivant</Button>
                </div>
            </div>

            <Logo></Logo>
        </div>
    );
}
