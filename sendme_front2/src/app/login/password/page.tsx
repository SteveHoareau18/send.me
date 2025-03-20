"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import {Logo} from "@/components/ui/logo";
import axios from "axios";
import {SPRING_URL} from "@/app/page";

export default function SignupPasswordPage() {
  const router = useRouter();
  const { loginData, setLoginData , connectData, setConnectData } = useAuth();

  const [password, setPassword] = useState(loginData.password || "");
  const [email] = useState(loginData.email || "");

  const handleLoginAccount = async () => {
    if (!password) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    setLoginData({ email, password });
    try {
      const response = await axios.post(SPRING_URL + "/auth/login", {
        username: email,
        password: password,
      });

      setConnectData(response.data);

      console.log("Connecté avec succès :",connectData.token);
      router.push("/");

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500">
      <div className="w-[600px] bg-white p-10 rounded-xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Connexion</h2>
        <p className="text-gray-500 mb-4">
          Saisissez votre mot de passe
        </p>

        <input
          type="password"
          placeholder="Mot de passe"
          className="mb-3 w-full px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <Link href="/login">
            <Button className="bg-blue-800 text-white px-6 py-2 rounded-lg">Retour</Button>
          </Link>
          <Button onClick={handleLoginAccount} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Se connecter</Button>
        </div>
      </div>

      <Logo></Logo>
    </div>
  );
}
