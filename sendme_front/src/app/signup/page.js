"use client";

import Stepper from "../../components/Stepper";
import React from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const steps =[
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
                { name: "An", type: "number", validationTypes: ["required", "number", "minYear"] },
                { name: "Genre", type: "select", options: ["Homme", "Femme", "Autre"], validationTypes: ["required"] },
            ],
        },
        {
            title: "Créer un compte",
            label: "Saisissez vos identifiant de connexion",
            fields: [
                { name: "Email", type: "email", validationTypes: ["required", "email"] },
                { name: "Mot de passe", type: "password", validationTypes: ["required", "password"] },
                { name: "Confirmer le mot de passe", type: "password", validationTypes: ["required", "confirmPassword"] },
            ],
        },
    ];

    return (
        <div className="w-full flex justify-center">
            <nav className={`absolute top-4 transition-all duration-300 right-28 gap-4 w-96 flex justify-around`}>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/')}>
                    Accueil
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                        onClick={() => router.push('/login')}>
                    Connexion
                </button>
            </nav>
            <div className="w-2/5">
                <Stepper steps={steps}/>
            </div>
        </div>
    );
}
