import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Input,
} from '@headlessui/react';
import useGlobalStore from '../../store';
import { account } from '../../App';
import toast from 'react-hot-toast';
import { toastStyles } from '../../lib/helper';
import { useState } from 'react';
import RotatingDotsLoader from '../loaders';

export default function MyModal({
    open,
    setOpen,
    info,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    info: any;
}) {
    function close() {
        setOpen(false);
    }

    const { userDetails, setUserDetails } = useGlobalStore();
    const [loading, setLoading] = useState(false);
    const handleUpdateProfile = async () => {
        setLoading(true);
        await account.connect();
        info.handleName = userDetails.name;
        info.bio = userDetails.bio;
        await account.updateProfile(info);
        toast.success('Profile updated successfully', toastStyles);
        setLoading(false);
    };
    return (
        <>
            <Dialog
                open={open}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-white"
                            >
                                Edit profile information
                            </DialogTitle>
                            <div className="flex items-center justify-center">
                                <img src={userDetails.profile} alt="profile" />
                            </div>
                            <Input
                                value={userDetails.name}
                                placeholder="Name"
                                className="block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Input
                                value={userDetails.bio}
                                placeholder="Bio"
                                className="block mt-4 w-full h-16 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        bio: e.target.value,
                                    })
                                }
                            />
                            <div className="mt-6 flex items-center w-full gap-x-4">
                                <div
                                    className="w-3/6 border border-white p-1 rounded-lg text-white cursor-pointer"
                                    onClick={() => close()}
                                >
                                    Close
                                </div>
                                <Button
                                    disabled={loading}
                                    className="w-3/6 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={handleUpdateProfile}
                                >
                                    <div className="mx-auto">
                                        {loading ? (
                                            <RotatingDotsLoader />
                                        ) : (
                                            'Save'
                                        )}
                                    </div>
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
