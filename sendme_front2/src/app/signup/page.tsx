"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import {isValidName} from "@/context/Verificator";

export default function SignupPage() {
  const router = useRouter();
  const { signupData, setSignupData } = useAuth();

  const [firstName, setFirstName] = useState(signupData.firstName || "");
  const [lastName, setLastName] = useState(signupData.lastName || "");

  const handleNext = () => {
    if (!firstName || !lastName)
      return alert("Tous les champs sont obligatoires.");

    if(!isValidName(firstName)){
      return alert("Prénom non valide");
    }

    if(!isValidName(lastName)){
      return alert("Nom non valide");
    }

    setSignupData({ firstName, lastName });
    router.push("/signup/password");
  };

  const resetForm = () => {
    setSignupData({ firstName: "", lastName: "" });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500">
      <div className="w-[600px] bg-white p-10 rounded-xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
        <p className="text-gray-500 mb-4">Saisissez votre nom</p>

        <input
          type="text"
          placeholder="Prénom"
          className="mb-3 w-full px-4 py-2 border rounded-lg"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          className="mb-4 w-full px-4 py-2 border rounded-lg"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <Link href="/login">
            <Button className="bg-blue-800 text-white px-6 py-2 rounded-lg" onClick={resetForm}>
              Connexion
            </Button>
          </Link>
          <Button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Suivant
          </Button>
        </div>
      </div>

      <Logo></Logo>
    </div>
  );
}
