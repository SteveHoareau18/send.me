import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Récupérer le token utilisateur depuis le localStorage ou les cookies
    const token = request.cookies.get("account")?.value; // Exemple avec cookies

    // Liste des routes protégées
    const authRoutes = ["/login", "/signup"];

    // Vérifie si l'utilisateur est connecté et tente d'accéder à une page d'authentification
    if (token && authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", request.url)); // Redirige vers la home
    }

    return NextResponse.next(); // Continue l'exécution normale
}

// Appliquer le middleware uniquement aux pages login/signup
export const config = {
    matcher: ["/login/:path*", "/signup/:path*"],
};
