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
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    userDetails: { address: '', profile: '', name: '', bio: '' },
    setUserDetails: (userDetails) => set({ userDetails }),
}));

export default useGlobalStore;
