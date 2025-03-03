"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// @ts-ignore
import bg from '../../public/background-folder2.png';
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);  // Empêche le rendu avant le montage du composant
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setDarkMode(storedTheme === "dark");
        } else {
            setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("theme", darkMode ? "dark" : "light");
        }
    }, [darkMode, isMounted]);

    // Empêche le rendu serveur en attendant le montage pour éviter l'erreur Hydration
    if (!isMounted) {
        return <div className="min-h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-900">Loading...</div>;
    }

    return (
        <html lang="en" className={darkMode ? "dark" : "light"}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white custom-background py-6"
            style={{
                backgroundImage: `url(${bg.src}), linear-gradient(to bottom, rgb(0 30 90 / 70%), rgb(22 144 255 / 70%))`,
            }}
        >
            <div className="px-4 sm:px-6 mb-8 absolute top-0 left-0 select-none flex justify-between items-baseline">
                <h1 className="custom-font-niconne lg:px-6 text-8xl text-white dark:text-black drop-shadow-xl subpixel-antialiased">
                    send.me
                </h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                    {darkMode ? <Sun className="w-6 h-6 text-yellow-400"/> : <Moon className="w-6 h-6 text-gray-800"/>}
                </button>
            </div>
            {children}
        </div>
        </body>
        </html>
    );
}
