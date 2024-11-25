import { Disclosure } from '@headlessui/react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { useState } from 'react';
import AiModal from '../modal/AiModal';
import { AnimatedGradientText } from '../text/ShinnyText';

const Share = ({
    title,
    outcomes,
    poolSize,
}: {
    title: string;
    outcomes: string[];
    poolSize: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {open && (
                <AiModal
                    isOpen={open}
                    setIsOpen={setOpen}
                    title={title}
                    outcomes={outcomes}
                    poolSize={poolSize}
                />
            )}
            <Disclosure
                as="div"
                className={'mt-2 h-full bg-[#1e293bcc] text-[#d1d1d1a6]'}
            >
                {({ open }) => (
                    <>
                        <Disclosure.Button className=" group flex w-full justify-center items-center mx-auto gap-x-2 py-1 ">
                            <span className="text-sm flex items-center gap-x-2">
                                Details
                                {open ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 15 16"
                                        fill="#d1d1d1a6"
                                    >
                                        <path
                                            d="M14 11C13.7664 11.0004 13.5399 10.9191 13.36 10.77L8 6.28998L2.63 10.61C2.52772 10.693 2.41002 10.7551 2.28368 10.7925C2.15734 10.8299 2.02485 10.842 1.89382 10.8281C1.76279 10.8142 1.63581 10.7745 1.52017 10.7113C1.40454 10.6481 1.30253 10.5627 1.22 10.46C1.13694 10.3577 1.07491 10.24 1.03747 10.1137C1.00004 9.98732 0.987949 9.85483 1.00189 9.7238C1.01583 9.59277 1.05552 9.46579 1.1187 9.35015C1.18187 9.23451 1.26728 9.1325 1.37 9.04998L7.37 4.21998C7.54894 4.0729 7.77338 3.99249 8.005 3.99249C8.23663 3.99249 8.46107 4.0729 8.64 4.21998L14.64 9.21998C14.7413 9.30393 14.825 9.40703 14.8863 9.52338C14.9477 9.63972 14.9855 9.76703 14.9975 9.89801C15.0096 10.029 14.9957 10.1611 14.9567 10.2867C14.9176 10.4123 14.8542 10.5289 14.77 10.63C14.677 10.7447 14.5596 10.8374 14.4265 10.9013C14.2934 10.9653 14.1477 10.999 14 11Z"
                                            fill="#d1d1d1a6"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 16 16"
                                        fill="#d1d1d1a6"
                                    >
                                        <path
                                            d="M2 4.99996C2.23365 4.9995 2.46008 5.08088 2.64 5.22996L8 9.70996L13.37 5.38996C13.4723 5.30689 13.59 5.24486 13.7163 5.20743C13.8427 5.17 13.9752 5.1579 14.1062 5.17184C14.2372 5.18578 14.3642 5.22548 14.4798 5.28865C14.5955 5.35183 14.6975 5.43723 14.78 5.53996C14.8631 5.64225 14.9251 5.75994 14.9625 5.88628C15 6.01262 15.0121 6.14511 14.9981 6.27614C14.9842 6.40717 14.9445 6.53415 14.8813 6.64979C14.8181 6.76543 14.7327 6.86744 14.63 6.94996L8.63 11.78C8.45106 11.927 8.22662 12.0074 7.995 12.0074C7.76337 12.0074 7.53893 11.927 7.36 11.78L1.36 6.77996C1.25874 6.69601 1.17504 6.59291 1.11368 6.47656C1.05233 6.36021 1.01453 6.23291 1.00246 6.10193C0.990383 5.97095 1.00427 5.83888 1.04331 5.71328C1.08235 5.58767 1.14579 5.47101 1.23 5.36996C1.32305 5.25525 1.44036 5.16257 1.5735 5.0986C1.70663 5.03462 1.85229 5.00094 2 4.99996Z"
                                            fill="#d1d1d1a6"
                                        />
                                    </svg>
                                )}
                            </span>
                        </Disclosure.Button>
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: -24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -24 }}
                                transition={{
                                    duration: 0.5,
                                    ease: easeOut,
                                }}
                            >
                                <Disclosure.Panel>
                                    <div className="h-[1px] w-full bg-[#E6CBCB29]" />
                                    <div className="pt-6 pb-2 px-4 text-sm flex items-center justify-between">
                                        <div>Ends on</div>
                                        <div>30 Dec 2024</div>
                                    </div>

                                    <div className="flex items-center justify-center  pb-2 text-sm w-full text-center gap-x-4">
                                        <motion.div
                                            whileHover={{ scale: 0.95 }}
                                            whileTap={{ scale: 0.8 }}
                                            className="p-2 w-full cursor-pointer"
                                            onClick={() => setOpen(true)}
                                        >
                                            <AnimatedGradientText>
                                                <span
                                                    className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
                                                >
                                                    AI risk report
                                                </span>
                                            </AnimatedGradientText>
                                        </motion.div>
                                    </div>
                                </Disclosure.Panel>
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default Share;
