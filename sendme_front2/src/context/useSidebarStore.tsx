import {create} from "zustand";

interface SidebarState {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: false, // Commence en mode réduit
    toggleSidebar: () => set((state) => ({isOpen: !state.isOpen})),
}));
