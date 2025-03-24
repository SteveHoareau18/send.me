import axios from "axios";
import {SPRING_URL} from "@/app/page";
import {X} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function SendFileModal({file, isOpen, onClose}: {
    file: File | null,
    isOpen: boolean;
    onClose: () => void
}) {
    const {getSession} = useAuth();
    const [fileName, setFileName] = useState<string>(file?.name || "");
    const router = useRouter();

    useEffect(() => {
        if (file) {
            setFileName(file.name);
        }
    }, [file]);

    const sendFile = async () => {
        if (!fileName) {
            return alert("Veuillez nommer le fichier...");
        }
        const formData = new FormData();
        if (file === null) throw new Error("No file selected");
        formData.append("file", file);
        if (fileName != file.name) {
            formData.append("name", fileName + "." + file.name.split(".").pop());
        } else {
            formData.append("name", fileName);
        }
        formData.append("isPrivate", "true");

        try {
            const response = await axios.post(
                `${SPRING_URL}/files/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${getSession()?.token}`,
                    },
                }
            );

            if (typeof window !== "undefined") {
                localStorage.setItem("lastFile", JSON.stringify(response.data));
                alert("Fichier envoyé avec succès !");
            } else {
                alert("Erreur survenue, le fichier n'a pas été envoyé...");
            }


            onClose();
            router.push("/");
        } catch (error) {
            console.error("Erreur :", error);
            alert("Échec de l'envoi du fichier");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Envoie de fichier</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={fileName || ""}
                        placeholder={"Nom du fichier..."}
                        onChange={(e) => setFileName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"/>
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Rendre le fichier privé</span>
                    </label>
                </div>

                <div className="flex gap-4 mt-4">
                    <button className="cursor-pointer w-full bg-gray-500 text-white py-2 rounded-lg" onClick={onClose}>
                        Annuler
                    </button>
                    <button className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg" onClick={sendFile}>
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}
