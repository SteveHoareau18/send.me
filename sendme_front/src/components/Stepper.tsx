"use client";
import { useState } from "react";

// Définition des types de validation
const validators = {
    name: (value) => /^[A-Za-zÀ-ÿ '-]+$/.test(value) || "Veuillez entrer un nom valide",
    number: (value) => /^[0-9]+$/.test(value) || "Veuillez entrer un nombre valide",
    password: (value) => value.length >= 6 || "Le mot de passe doit contenir au moins 6 caractères",
    confirmPassword: (value, formData) => value === formData["Mot de passe"] || "Les mots de passe ne correspondent pas",
    required: (value) => !!value || "Ce champ est requis",
    minYear: (value) => (parseInt(value, 10) <= 2012) || "Vous devez avoir au moins 13 ans",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Veuillez entrer une adresse email valide",
};

// Fonction pour appliquer plusieurs validations à un champ
const validateField = (value, validationTypes, formData) => {
    for (let type of validationTypes) {
        const validator = validators[type];
        if (validator) {
            const validationResult = validator(value, formData);
            if (validationResult !== true) {
                return validationResult; // Retourne le premier message d'erreur rencontré
            }
        }
    }
    return true;
};

export default function Stepper({ steps }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        let newErrors = {};
        steps[step].fields.forEach(({ name, validationTypes }) => {
            const value = formData[name]?.trim() || "";
            const validationResult = validateField(value, validationTypes, formData);
            if (validationResult !== true) {
                newErrors[name] = validationResult;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const nextStep = () => {
        if (validateFields()) {
            if (step < steps.length - 1) {
                setStep(step + 1);
            } else {
                console.log("Envoi des données:", JSON.stringify(formData));
            }
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg w-full h-96 text-black dark:text-white flex">
            <div className="w-1/2 h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">{steps[step].title}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{steps[step].label}</p>
            </div>
            <div className="w-1/2 flex flex-col justify-center">
                <div className="space-y-4">
                    {steps[step].fields.map(({name, type, options}, index) => (
                        <div key={index}>
                            {type === "select" ? (
                                <select
                                    name={name}
                                    value={formData[name] || ""}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 ${errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
                                >
                                    <option value="">Sélectionnez {name.toLowerCase()}</option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={name}
                                    value={formData[name] || ""}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 ${errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
                                />
                            )}
                            {errors[name] && <p className="text-red-500 text-sm dark:text-red-400">{errors[name]}</p>}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    {step > 0 && <button onClick={prevStep} className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 px-4 rounded-lg mr-2">Retour</button>}
                    <button onClick={nextStep} className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg">
                        {step === steps.length - 1 ? "Envoyer" : "Suivant"}
                    </button>
                </div>
            </div>
        </div>
    );
}
