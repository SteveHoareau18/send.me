import { useEffect, useState } from "react";
import axios from "axios";
import { SPRING_URL } from "@/app/page";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface File {
    id: number;
    name: string;
    uploadedAt: string;
}

export default function FileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { connectData, setConnectData } = useAuth(); // Récupérer le token
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
        }
    }, [isOpen]);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            console.log(connectData);
            const response = await axios.get(`${SPRING_URL}/files`, {
                headers: { Authorization: `Bearer ${connectData.token}` },
            });
            console.log(response.data);
            setFiles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des fichiers :", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mes fichiers</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {loading ? (
                    <p>Chargement...</p>
                ) : files.length > 0 ? (
                    <ul className="space-y-2">
                        {files.map((file) => (
                            <li key={file.id} className="p-2 border-b">
                                📄 {file.name} - <span className="text-gray-500 text-sm">{new Date(file.uploadedAt).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun fichier trouvé.</p>
                )}

                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
}
