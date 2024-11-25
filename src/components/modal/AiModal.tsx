import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { getAiResponse, uploadFile } from '../../api';
import { toastStyles } from '../../lib/helper';
import useGlobalStore from '../../store';
import SpinningCubeLoader from '../loaders/Flip';
const framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
};
export default function AiModal({
    isOpen,
    setIsOpen,
    title,
    outcomes,
    poolSize,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    outcomes: string[];
    poolSize: string;
}) {
    function close() {
        setIsOpen(false);
    }

    const betDetails = `There is a bet placed on ${title} with these options ${outcomes} and pool size of ${poolSize} analyse the risk for the bet`;
    const { testnetTrx, setTestnetTrx } = useGlobalStore();
    const { data, isLoading } = useQuery({
        queryKey: ['ai-response'],
        queryFn: async () => {
            const resp = await getAiResponse(betDetails);
            generateUploadFile(resp);
            return resp;
        },
        enabled: !testnetTrx,
    });
    const { mutateAsync: generateUploadFile } = useMutation({
        mutationFn: async (fileData) => {
            const textContent =
                typeof fileData === 'object'
                    ? JSON.stringify(fileData, null, 2)
                    : String(fileData);
            const blob = new Blob([textContent], { type: 'text/plain' });
            const file = new File([blob], 'ai-response.txt', {
                type: 'text/plain',
            });

            const formData = new FormData();
            formData.append('file', file);
            return await uploadFile({ file: formData });
        },
        onSuccess: (data) => {
            toast.success(
                'AI risk analysis uploaded successfully to ArDrive',
                toastStyles
            );
            setTestnetTrx(data.id);
        },
    });
    const heading = `Generating AI risk analysis for ${title}`;

    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="font-semibold text-base/7  text-white"
                            >
                                <AnimatePresence mode="wait">
                                    {heading.split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            variants={framerProps}
                                            transition={{
                                                duration: 0.5,
                                                delay: i * 0.08,
                                            }}
                                            className="origin-center drop-shadow-sm"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </DialogTitle>
                            {isLoading ? (
                                <SpinningCubeLoader />
                            ) : (
                                <Markdown className="mt-2 text-[#D1D1D1A6] text-sm text-white bg-black rounded-lg h-[150px] overflow-y-auto p-4">
                                    {data}
                                </Markdown>
                            )}
                            {testnetTrx && (
                                <>
                                    <div className="pt-5 text-white flex items-center text-sm justify-between">
                                        <a
                                            href={`https://arweave.net/${testnetTrx}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline cursor-pointer"
                                        >
                                            Download file
                                        </a>
                                        <a
                                            href={`https://viewblock.io/arweave/tx/${testnetTrx}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline cursor-pointer"
                                        >
                                            Verify on viewblock
                                        </a>
                                    </div>
                                    <div className="mt-6">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={close}
                                        >
                                            Got it, thanks!
                                        </Button>
                                    </div>
                                </>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
