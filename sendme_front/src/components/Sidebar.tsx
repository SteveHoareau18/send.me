import React, {useState} from 'react';

// @ts-ignore


export default function Sidebar({ setIsSidebarOpen }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-900 shadow-lg p-4 rounded-tl-lg text-black dark:text-white transition-all duration-300 ${isOpen ? "translate-x-0 w-80" : "w-16 p-2"}`}>
            <button
                className="absolute top-4 left-[-40px] bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setIsSidebarOpen(!isOpen);
                }}
            >
                {isOpen ? "✖" : "☰"}
            </button>
            {isOpen && (
                <div className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <p className="font-semibold">Andrew Smith</p>
                    </div>
                    <h3 className="text-md font-semibold mb-2">Derniers fichiers reçus</h3>
                    <ul className="space-y-2">
                        {Array(6).fill("Fichier.pdf").map((file, index) => (
                            <li key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex items-center">
                                📄 {file}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Mes fichiers</button>
                    <button className="mt-2 w-full bg-red-500 dark:bg-red-600 text-white py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700">Se déconnecter</button>
                </div>
            )}

            {!isOpen && (
                <div className="flex flex-col items-center w-full">
                    <img src="/icons/file.svg" alt="Files Icon" className="w-full h-6 mb-4"/>
                    <img src="/icons/logout.svg" alt="Logout Icon" className="w-full h-6"/>
                </div>
            )}
        </div>
    );
}
