"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "@/context/Verificator";
import axios from "axios";
import { SPRING_URL } from "@/app/page";

export default function SignupPasswordPage() {
  const router = useRouter();
  const { signupData, setSignupData } = useAuth();

  const [email, setEmail] = useState(signupData.email || "");
  const [password, setPassword] = useState(signupData.password || "");
  const [confirmPassword, setConfirmPassword] = useState(signupData.confirmPassword || "");

  const handleCreateAccount = async () => {
    if (!email || !password || !confirmPassword) {
      return alert("Tous les champs sont obligatoires.");
    }

    if (!isValidEmail(email)) {
      return alert("Email non valide");
    }

    if (password !== confirmPassword) {
      return alert("Les mots de passe ne correspondent pas.");
    }

    if (!isValidPassword(password)) {
      return alert("Mot de passe non valide, il faut: 8 caractères, une majuscule, une minuscule, 1 chiffre et un caractère spécial");
    }

    setSignupData({ email, password, confirmPassword });

    try {
      const response = await axios.post(SPRING_URL + "/auth/signup", {
        firstName: signupData.firstName,
        name: signupData.lastName,
        email: email,
        password: password,
      });

      console.log("Compte créé avec succès :", response.data);
      alert("Compte créé avec succès !");
      router.push("/");

    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
      alert("Une erreur s'est produite lors de la création du compte.");
    }
  };

  return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500">
        <div className="w-[600px] bg-white p-10 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
          <p className="text-gray-500 mb-4">
            Saisissez votre email et mot de passe
          </p>

          <input
              type="email"
              placeholder="Email"
              className="mb-3 w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              placeholder="Mot de passe"
              className="mb-3 w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="mb-4 w-full px-4 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <Link href="/signup">
              <Button className="bg-blue-800 text-white px-6 py-2 rounded-lg">Retour</Button>
            </Link>
            <Button onClick={handleCreateAccount} className="bg-blue-600 text-white px-6 py-2 rounded-lg">S&#39;enregistrer</Button>
          </div>
        </div>
      </div>
  );
}
