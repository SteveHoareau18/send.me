import {useEffect, useState} from "react";
import axios from "axios";
import {SPRING_URL} from "@/app/page";
import {X} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {FileContext} from "@/context/FileContext";
import {getFilePath} from "@/context/FilePath";

export default function ListFileModal({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) {
    const {getSession} = useAuth(); // Récupérer le token
    const [files, setFiles] = useState<FileContext[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
        }
    }, [isOpen]);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            console.log(getSession());
            const response = await axios.get(`${SPRING_URL}/files`, {
                headers: {Authorization: `Bearer ${getSession()?.token}`},
            });
            console.log(response.data);
            setFiles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des fichiers :", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mes fichiers</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                {/* Champ de recherche */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher un fichier..."
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p>Chargement...</p>
                ) : filteredFiles.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                        {/* Liste des fichiers avec scroll */}
                        <ul className="space-y-2">
                            {filteredFiles.map((file) => (
                                <li key={file.id} className="cursor-pointer p-2 border-b">
                                    <a href={getFilePath(file)}>
                                        📄 {file.name} -{" "}
                                        <span className="text-gray-500 text-sm">
                                            {new Date(file.uploadedAt).toLocaleString()}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Aucun fichier trouvé.</p>
                )}

                <button
                    className="cursor-pointer mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                    onClick={onClose}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
