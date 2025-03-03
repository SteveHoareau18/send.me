import React, {useState} from "react";

export default function FileUpload() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        if (event.dataTransfer.files.length > 0) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };


    const ellipsis = (text, max) => {
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

    return (
        <div className="flex flex-col items-center justify-center self-start w-96">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-black dark:text-white w-full h-96 flex flex-col items-center justify-around">
                <h2 className="text-xl font-semibold mb-4">Envoyez un fichier</h2>
                <div
                    className={`border-2 border-dashed ${dragActive || selectedFile ? "border-purple-500 bg-purple-100 dark:bg-purple-800" : "border-gray-300 dark:border-gray-600"} p-10 text-center rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none flex-1 flex flex-col items-center justify-around w-full transition-all duration-300`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <img src="/icons/upload-cloud.svg" alt="Upload Icon" className="w-10 h-10" />
                    <p className="text-gray-500 dark:text-gray-400">{selectedFile ? ellipsis(selectedFile.name, 64) : "Glissez & déposez un fichier"}</p>
                    <input type="file" className="hidden" onChange={handleFileSelect} id="fileInput" />
                    <label htmlFor="fileInput" className="text-blue-600 dark:text-purple-400 cursor-pointer mt-2">Ou sélectionnez un fichier</label>
                </div>
                <button className={`mt-4 w-full text-white py-2 rounded-lg ${selectedFile ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 cursor-pointer" : "bg-gray-500 dark:bg-gray-700 cursor-auto"}`}>
                    Envoyer ✉️
                </button>
            </div>
        </div>
    );
}