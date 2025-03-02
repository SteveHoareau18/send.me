"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Vérifier si un utilisateur est stocké dans localStorage
        const user = localStorage.getItem("user");

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                // Vérifier si un token ou userId est présent (critère d'authentification)
                if (parsedUser.token || parsedUser.userId) {
                    setIsAuthenticated(true);
                    setIsSidebarOpen(true);
                }
            } catch (error) {
                console.error("Erreur de parsing du localStorage:", error);
                localStorage.removeItem("user"); // Nettoyage en cas d'erreur
            }
        }
    }, []);

    return (
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-6">

            {/* Barre de navigation avec les boutons Connexion et Inscription */}
            {!isAuthenticated && (
                <nav className={`absolute top-4 transition-all duration-300 right-28 gap-4 w-96 flex justify-around`}>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-800"
                            onClick={() => router.push('/login')}>
                        Connexion
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-40 shadow-md hover:bg-blue-600"
                            onClick={() => router.push('/signup')}>
                        Inscription
                    </button>
                </nav>
            )}

            {/* Contenu principal */}
            <div className="flex">
                <FileUpload />
                {isAuthenticated && (
                    <div className="ml-16">
                        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
                    </div>
                )}
            </div>
        </div>
    );
}
