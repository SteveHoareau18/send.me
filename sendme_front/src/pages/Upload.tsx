import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Upload() {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map((file) => file.name);
            setUploadedFiles([...uploadedFiles, ...files]);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Téléchargez vos fichiers</h1>
                <div className="border-dashed border-2 border-gray-400 p-8 rounded-md text-center">
                    <p className="text-gray-600 mb-4">Glissez vos fichiers ici ou cliquez pour télécharger</p>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Choisir des fichiers
                    </label>
                </div>
                <ul className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                        <li key={index} className="p-2 bg-white rounded-md shadow-md">
                            {file}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Upload;
