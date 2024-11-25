import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';
import { Slider } from '../slider';
import { Input } from '@headlessui/react';
import IconToggle from '../toggle';
import { Tooltip } from 'react-tooltip';
import BuyModal from '../modal/BuyModal';
import Share from '../Disclosure';
export const HoverEffect = ({
    title,
    outcomes,
    desc,
    key,
    yes,
    no,
    poolSize,
}: {
    title: string;
    outcomes: string[];
    desc: string;
    key: number;
    yes: string;
    no: string;
    poolSize: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [sliderValue, setSliderValue] = useState([2]);
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    return (
        <>
            {showModal && (
                <BuyModal
                    open={showModal}
                    selectedIndex={selectedIndex}
                    setOpen={setShowModal}
                    option={outcomes[selectedIndex]}
                    userInput={sliderValue[0]}
                    outcome={outcomes[selectedIndex]}
                />
            )}
            <div
                className="relative group  block p-2 h-full w-full"
                onMouseEnter={() => setHoveredIndex(key)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <AnimatePresence>
                    {hoveredIndex === key && (
                        <motion.span
                            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                            layoutId="hoverBackground"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.15 },
                            }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.15, delay: 0.2 },
                            }}
                        />
                    )}
                </AnimatePresence>
                <Card title={title} outcomes={outcomes} poolSize={poolSize}>
                    <div className="flex items-center gap-x-5 border border-b-[#fff3] border-x-0 border-t-0 pb-3 pt-2 justify-between">
                        <CardTitle isOpen={isOpen} className={`font-semibold`}>
                            {title}
                        </CardTitle>
                        {isOpen && (
                            <svg
                                onClick={() => setIsOpen(false)}
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                className="cursor-pointer bg-[#7f92a25e] rounded-md size-5"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"></path>
                            </svg>
                        )}
                    </div>{' '}
                    {isOpen ? (
                        <motion.div
                            className="w-full mt-4"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{
                                ease: 'easeOut',
                                duration: 0.1,
                            }}
                        >
                            <div className="flex items-center gap-x-4">
                                <Input
                                    type="number"
                                    value={sliderValue[0]}
                                    placeholder="$10"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-3/6 rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                                    onChange={(e) =>
                                        setSliderValue([
                                            parseInt(e.target.value),
                                        ])
                                    }
                                />
                                <Slider
                                    min_price={1}
                                    max_price={4}
                                    sliderValue={sliderValue}
                                    setSliderValue={setSliderValue}
                                />
                            </div>
                            <div className="pt-4 text-green-600 font-bold text-sm">
                                Winning amount:{' '}
                                <span>${sliderValue[0] * 1.5} (50%)</span>
                            </div>
                            <div className="text-sm font-medium  justify-between w-full cursor-pointer pt-1 flex items-center">
                                <div className="flex items-center gap-x-2">
                                    Insure your bet <IconToggle />
                                </div>
                                <div>
                                    <Tooltip
                                        id="my-tooltip"
                                        place="top"
                                        style={{
                                            fontWeight: 400,
                                            borderRadius: '10px',
                                            maxWidth: '250px',
                                            textAlign: 'center',
                                            opacity: 1,
                                        }}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={`5% of the bet amounts and 80% refund of the bet amount if the user loses`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                onClick={() => setShowModal(true)}
                                className={`mt-4 ${
                                    selectedIndex === 0
                                        ? 'bg-[#27ae60]'
                                        : 'bg-[#e64800]'
                                } rounded-md py-1 text-center font-semibold cursor-pointer`}
                            >
                                Buy {outcomes[selectedIndex]}
                                <div className="text-[11px]">
                                    To win ${sliderValue[0] * 1.5}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="mt-1">
                            <div className="text-sm line-clamp-2 text-[#D1D1D1A6]">
                                {desc}
                            </div>
                            <div className="mt-16 w-full flex items-center text-center gap-x-3 font-semibold text-sm">
                                {outcomes.map((outcome, index) => (
                                    <div
                                        onClick={() => {
                                            setIsOpen(true);
                                            setSelectedIndex(index);
                                        }}
                                        className={`flex items-center justify-between  px-2 w-3/6 ${
                                            index === 0
                                                ? 'hover:bg-[#27ae60] bg-[#27ae6033] text-[#27AE60]'
                                                : 'hover:bg-[#e64800] bg-[#EB575733] text-[#E64800]'
                                        }  hover:text-white  rounded-md  cursor-pointer`}
                                    >
                                        <div> Buy {outcome}</div>
                                        <div className="border-[#fff3] border-l p-2 pr-0 text-center">
                                            {index === 0 ? yes : no}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=" text-[#858d92] mt-2 text-sm flex items-center gap-x-2">
                                Insurance available.
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
};

export const Card = ({
    className,
    children,
    title,
    outcomes,
    poolSize,
}: {
    className?: string;
    children: React.ReactNode;
    title: string;
    outcomes: string[];
    poolSize: string;
}) => {
    return (
        <div className="rounded-2xl  w-full mb-2 pt-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="relative z-50">
                <div className="border border-b-[#fff3] text-center border-x-0 border-t-0 font-semibold flex items-center justify-center gap-x-2 text-sm pb-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                        />
                    </svg>
                    Pool Size {poolSize}
                </div>
                <div className="px-4">{children}</div>

                <Share title={title} outcomes={outcomes} poolSize={poolSize} />
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
    isOpen,
}: {
    className?: string;
    children: React.ReactNode;
    isOpen: boolean;
}) => {
    return (
        <div
            className={`text-zinc-100 text-[15px] font-bold tracking-wide ${
                isOpen && 'line-clamp-1'
            }`}
        >
            {children}
        </div>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
            {children}
        </p>
    );
};
