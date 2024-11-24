import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
const framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
};
export default function AiModal({
    isOpen,
    setIsOpen,
    title,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}) {
    function close() {
        setIsOpen(false);
    }
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
                            <p className="mt-2 text-sm/6 text-white/50">
                                Your payment has been successfully submitted.
                                We’ve sent you an email with all of the details
                                of your order.
                            </p>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={close}
                                >
                                    Got it, thanks!
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
