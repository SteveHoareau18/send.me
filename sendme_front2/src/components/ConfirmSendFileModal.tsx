import {X} from "lucide-react";
import {FileContext} from "@/context/FileContext";
import {getFilePath} from "@/context/FilePath";

export default function ConfirmSendFileModal({file, isOpen}: { file: FileContext | null, isOpen: boolean }) {

    if (file === null) throw new Error("Cant load context from file: " + file);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Lien du fichier</h2>
                    <a href={"/"} className="cursor-pointer">
                        <X className="w-6 h-6"/>
                    </a>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={getFilePath(file)}
                        disabled={true}
                    />
                </div>


                <div className="flex gap-4 mt-4">
                    <a href={"/"}
                       className="cursor-pointer w-full bg-green-500 text-white py-2 rounded-lg flex justify-center items-center">
                        <p className="align-center">OK</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
