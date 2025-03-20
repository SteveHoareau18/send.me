"use client";
import Stepper from "../../components/Stepper";
import React from "react";
import { useRouter } from "next/navigation";
import {useState} from "react"
import axios from "axios";


export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        Email: "",
        "Mot de passe": "",
    });
    const [error, setError] = useState("");

    const steps = [
        {
            title: "Connexion",
            label: "Entrez vos identifiants",
            fields: [
                { name: "Email", type: "text", validationTypes: ["required", "email"] },
                { name: "Mot de passe", type: "password", validationTypes: ["required", "password"] },
            ],
        }
    ];

    const handleSignup = async (formData) => {
        console.log("handleSignup() déclenché "); //on test

        setError("");
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:8000/auth/login", {
                username: formData.Email,
                password: formData["Mot de passe"],
            });
            console.log(" Réponse API :", response.status, response.data);


            console.log("Connexion réussie :", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/");
        } catch (err) {
            setError("Erreur lors de la connexion. Veuillez réessayer.");
            console.error("Erreur de connexion :", err);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <nav className={`absolute top-4 transition-all duration-300 right-28 gap-4 w-96 flex justify-around`}>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/')}>
                    Accueil
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/signup')}>
                    Inscription
                </button>
            </nav>
            <div className="w-2/5">
                <Stepper steps={steps} onSubmit={handleSignup}/>
            </div>
        </div>
    )

        ;
}
