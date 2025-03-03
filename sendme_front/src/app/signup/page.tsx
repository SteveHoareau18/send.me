"use client";

import Stepper from "../../components/Stepper";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import axios from "axios";
export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        Prénom: "",
        Nom: "",
        Email: "",
        "Mot de passe": "",
        "Confirmer le mot de passe": "",
    });
    const [error, setError] = useState("");

    const steps = [
        {
            title: "Créer un compte",
            label: "Saisissez votre nom",
            fields: [
                { name: "Prénom", type: "text", validationTypes: ["required", "name"] },
                { name: "Nom", type: "text", validationTypes: ["required", "name"] },
            ],
        },
        {
            title: "Créer un compte",
            label: "Saisissez vos informations générales",
            fields: [
                { name: "Jours", type: "number", validationTypes: ["required", "number"] },
                { name: "Mois", type: "select", options: ["Janvier", "Février", "Mars", "Avril",
                        "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], validationTypes: ["required"] },
                { name: "An", type: "text", validationTypes: ["required", "number", "minYear"] },
            ],
        },
        {
            title: "Créer un compte",
            label: "Saisissez vos identifiants de connexion",
            fields: [
                { name: "Email", type: "email", validationTypes: ["required", "email"] },
                { name: "Mot de passe", type: "password", validationTypes: ["required", "password"] },
                { name: "Confirmer le mot de passe", type: "password", validationTypes: ["required", "confirmPassword"] },
            ],
        },
    ];

    // pour géerer l'inscription
    const handleSignup = async () => {
        console.log("handleSignup() déclenché "); //on test

        setError("");
//les mots de passe ne correspondent pas on verifie
        if (formData["Mot de passe"] !== formData["Confirmer le mot de passe"]) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/auth/signup", {
                email: formData.Email,
                password: formData["Mot de passe"],
                firstName: formData.Prénom,
                name: formData.Nom,
            });
            console.log(" Réponse API :", response.status, response.data);


            console.log("Inscription réussie :", response.data);
            router.push("/login");
        } catch (err) {
            setError("Erreur lors de l'inscription. Veuillez réessayer.");
            console.error("Erreur d'inscription :", err);
        }
    };

    return (
        <div className="w-full flex justify-center">
            {/* Navigation */}
            <nav className="absolute top-4 transition-all duration-300 right-28 gap-4 w-96 flex justify-around">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/')}>
                    Accueil
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/login')}>
                    Connexion
                </button>
            </nav>

            {/* Formulaire d'inscription */}
            <div className="w-2/5">
                <Stepper steps={steps} />
                {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* ✅ Affichage des erreurs */}

                <button
                    className="bg-blue-600 text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-700"
                    onClick={handleSignup}
                >
                    S'inscrire
                </button>
            </div>
        </div>
    );
}
