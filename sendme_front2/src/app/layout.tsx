"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
  );
}

// Composant interne pour gérer l'effet client
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAccountValid } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const isValid = await isAccountValid();
      if (isValid && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
        router.push("/")
      }
    }

    checkAuth();
  }, [pathname]);

  return (
      <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      </body>
      </html>
  );
}
