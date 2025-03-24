"use client";

import {useSidebarStore} from "@/context/useSidebarStore";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {FileText, LogOut, Menu, Send, X} from "lucide-react";
import {useEffect, useState} from "react";
import {Account} from "@/context/Account";
import ListFileModal from "@/components/ListFileModal";

export default function Sidebar() {
    const {isOpen, toggleSidebar} = useSidebarStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {getUserData, setConnectData} = useAuth();
    const router = useRouter();

    const [user, setUser] = useState<Account | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserData();
            if (userData) setUser(userData);
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        setConnectData({token: "", expiringTime: 0}); // Supprime le token
        localStorage.removeItem("account");
        router.push("/login"); // Redirige vers la connexion
    };

    return (user &&
        <>
            <div className="fixed right-0 top-0 h-full z-50 transition-all duration-300 ease-in-out">
                {/* Sidebar Container */}
                <div className={`h-full bg-white shadow-md flex flex-col items-center py-4
                    ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>

                    {/* Bouton Toggle */}
                    <button onClick={toggleSidebar} className="mb-4 cursor-pointer">
                        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>

                    {/* Avatar */}
                    <img
                        alt="User Avatar"
                        src={`https://eu.ui-avatars.com/api/?name=${user.name}+${user.firstName}&size=250`}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="align-center">{user.name} {user.firstName}</p>


                    {/* Liens */}
                    <div className="flex flex-col items-center mt-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-6 h-6"/>
                            {isOpen && <span>FICHIERS REÇUS</span>}
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="cursor-pointer flex items-center gap-2"
                                    onClick={() => setIsModalOpen(true)}>
                                <Send className="w-6 h-6"/>
                                {isOpen && <span>MES FICHIERS</span>}
                            </button>
                        </div>
                    </div>

                    {/* Déconnexion */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer mt-auto flex items-center gap-2 text-red-500 mb-4"
                    >
                        <LogOut className="w-6 h-6"/>
                        {isOpen && <span>DÉCONNEXION</span>}
                    </button>
                </div>
            </div>
            <ListFileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
}
