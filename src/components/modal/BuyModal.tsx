import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Input,
} from '@headlessui/react';

const BuyModal = ({
    open,
    selectedIndex,
    setOpen,
    option,
}: {
    open: boolean;
    selectedIndex: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    option: string;
}) => {
    function close() {
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            as="div"
            className="relative z-50 focus:outline-none shadow-2xl"
            onClose={close}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className=" text-white w-full max-w-md rounded-xl font-semibold bg-white/5 p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle
                            as="h3"
                            className="text-base/7 text-center  border border-b border-x-0 border-t-0 pb-2"
                        >
                            Order summary
                        </DialogTitle>
                        <div className="flex items-start font-medium py-2">
                            Review Insurance
                        </div>
                        <div className="pt-1 flex items-center justify-between text-sm">
                            <div>Bet Amount</div>
                            <div>$50 USDC</div>
                        </div>
                        <div className="pt-1 flex items-center justify-between text-sm">
                            <div>Insurance cost</div>
                            <div>$2.50 USDC</div>
                        </div>
                        <div className="pt-1 flex items-center justify-between text-sm">
                            <div>Refund on loss</div>
                            <div>$40 USDC (80% of the bet)</div>
                        </div>
                        <div className="pt-6 flex items-center justify-between text-sm">
                            <div>Potential winning amount</div>
                            <div className="text-green-600">
                                $140 USDC (100%)
                            </div>
                        </div>

                        <div className="mt-6 flex items-center w-full gap-x-4">
                            <div
                                className="w-3/6 border border-white p-1 rounded-lg  cursor-pointer text-center"
                                onClick={() => close()}
                            >
                                Close
                            </div>
                            <Button
                                className={`w-3/6 inline-flex items-center gap-2 rounded-md ${
                                    selectedIndex === 0
                                        ? 'bg-[#27ae60]'
                                        : 'bg-[#e64800]'
                                }  py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white `}
                            >
                                <div className="mx-auto">Buy {option}</div>
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default BuyModal;
