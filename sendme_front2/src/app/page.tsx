"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {UploadCloud} from "lucide-react";
import {Logo} from "@/components/ui/logo";
import {useAuth} from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import {useRouter} from "next/navigation";
import SendFileModal from "@/components/SendFileModal";
import ConfirmSendFileModal from "@/components/ConfirmSendFileModal";
import {FileContext} from "@/context/FileContext";

export const SPRING_URL = "http://localhost:8000";

export default function Home() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const {isAccountValid} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const storedFile = localStorage.getItem("lastFile");

    const [fileContext, setFileContext] = useState<FileContext | null>(
        storedFile ? JSON.parse(storedFile) : null
    );
    const [isConfirmSendFile, setIsConfirmSendFile] = useState<boolean>(fileContext !== null);

    if (typeof window !== "undefined") {
        const storedFile = localStorage.getItem("lastFile");
        if (storedFile) {
            setFileContext(JSON.parse(storedFile));
            setIsConfirmSendFile(true);
            localStorage.removeItem("lastFile");
        }
    }

    // Vérifier l'authentification une seule fois au chargement
    useEffect(() => {
        const checkAuth = async () => {
            const valid = await isAccountValid();
            setIsAuthenticated(valid);
        };

        checkAuth();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // Si c'est une image, on génère un aperçu
            if (selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(null);
            }
        }
    };

    const sendFile = async () => {
        if (!file) {
            alert("Veuillez sélectionner un fichier !");
            return;
        }

        if (!isAuthenticated) {
            alert("Veuillez vous identifier");
            setTimeout(() => router.push("/login"), 100);
            return;
        }
        setFile(file);
        setIsModalOpen(true);
    };


    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500">
            <div className="flex gap-10 items-center">
                {/* Upload Box */}
                <Card className="w-96 p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="text-lg font-semibold text-center">Télécharger un fichier</h2>
                    <CardContent
                        className="mt-4 border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer">
                        <label htmlFor="file-upload"
                               className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                            <UploadCloud size={40} className="text-gray-500"/>
                            <span className="text-gray-500 cursor-pointer">Drag & drop file</span>
                        </label>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange}/>
                    </CardContent>

                    {/* Affichage du fichier sélectionné */}
                    {file && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-700">{file.name}</p>
                            {preview && <img src={preview} alt="Preview"
                                             className="mt-2 w-full max-h-40 object-cover rounded-lg"/>}
                        </div>
                    )}

                    <Button className="cursor-pointer w-full mt-4 bg-indigo-500 hover:bg-indigo-600"
                            onClick={sendFile}>ENVOYER</Button>
                </Card>

                {/* Folder Icon */}
                <div className="relative w-64 h-48 bg-blue-500 rounded-lg shadow-lg">
                    <div className="absolute top-0 left-4 w-56 h-6 bg-blue-700 rounded-t-lg"></div>
                </div>
            </div>

            {/* Header Buttons */}
            {isAuthenticated === false && (
                <div className="absolute top-6 right-6 flex gap-4">
                    <Link href="/login">
                        <Button
                            className="cursor-pointer bg-blue-800 text-white px-6 py-2 rounded-lg">Connexion</Button>
                    </Link>
                    <Link href="/signup">
                        <Button
                            className="cursor-pointer bg-blue-800 text-white px-6 py-2 rounded-lg">Inscription</Button>
                    </Link>
                </div>
            )}

            {isAuthenticated && <Sidebar></Sidebar>}

            <Logo></Logo>
            <SendFileModal file={file} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            {fileContext && (
                <ConfirmSendFileModal
                    file={fileContext}
                    isOpen={isConfirmSendFile}
                />
            )}
        </div>
    );
}
