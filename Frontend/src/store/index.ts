import { create } from 'zustand';

interface GlobalStore {
    userDetails: {
        address: string;
        profile: string;
        name: string;
        bio: string;
    };
    setUserDetails: (userDetails: {
        address: string;
        profile: string;
        name: string;
        bio: string;
    }) => void;
    userWallet: { wallet: string; addr: string };
    setUserWallet: (userWallet: { wallet: string; addr: string }) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    userDetails: { address: '', profile: '', name: '', bio: '' },
    setUserDetails: (userDetails) => set({ userDetails }),
    userWallet: { wallet: '', addr: '' },
    setUserWallet: (userWallet) => set({ userWallet }),
}));

export default useGlobalStore;
