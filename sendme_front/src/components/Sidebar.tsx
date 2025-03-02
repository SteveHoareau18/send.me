import React from 'react';

function Sidebar() {
    const files = ['file1.txt', 'image.png', 'document.pdf']; // Une liste de fichiers simulée

    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-lg font-bold mb-4">Historique des fichiers</h2>
            <ul className="space-y-2">
                {files.map((file, index) => (
                    <li key={index} className="bg-gray-700 p-2 rounded-md hover:bg-gray-600">
                        {file}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
