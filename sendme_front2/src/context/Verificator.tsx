"use client";
"use client";

export const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidName = (name: string) => {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(name.trim());
};

export const isValidPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
