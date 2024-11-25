import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastStyles } from '../../lib/helper';
import { processId } from '../header';
const BuyModal = ({
    open,
    selectedIndex,
    setOpen,
    option,
    userInput,
    outcome,
}: {
    open: boolean;
    selectedIndex: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    option: string;
    userInput: number;
    outcome: string;
}) => {
    function close() {
        setOpen(false);
    }
    const [btnState, setBtnState] = useState<
        | 'Buy'
        | 'Tranfering funds...'
        | 'Funds Transfered successfully'
        | 'Placing bet...'
        | 'Bet placed successfully'
    >('Buy');
    const [trsHash, setTrsHash] = useState('');
    const [betHash, setBetHash] = useState('');
    const handlePredictionAction = async () => {
        setBtnState('Tranfering funds...');
        toast.loading('Transferring funds', toastStyles);
        const response = await message({
            process: processId,
            tags: [
                { name: 'Action', value: 'Transfer' },
                {
                    name: 'Recipient',
                    value: 'NUMygtth1T5LGKObzjFD76VnZymqFkpoJ51sMK5OBds',
                },
                { name: 'Quantity', value: (userInput * 10 ** 12).toString() },
            ],
            signer: createDataItemSigner(window.arweaveWallet),
        });
        setBtnState('Funds Transfered successfully');
        toast.dismiss();
        toast.success('Funds Transfered successfully', toastStyles);
        setTrsHash(response);
        if (response) {
            toast.dismiss();
            toast.loading('Placing bet', toastStyles);
            setBtnState('Placing bet...');
            const placeBet = await message({
                process: 'NUMygtth1T5LGKObzjFD76VnZymqFkpoJ51sMK5OBds',
                tags: [
                    { name: 'Action', value: 'PlaceBet' },
                    {
                        name: 'Prediction',
                        value: outcome,
                    },
                    { name: 'Quantity', value: userInput.toString() },
                    { name: 'Insure', value: 'true' },
                ],
                signer: createDataItemSigner(window.arweaveWallet),
            });
            setBetHash(placeBet);
            toast.dismiss();
            toast.success('Bet placed successfully', toastStyles);
            setBtnState('Bet placed successfully');
        }
    };

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
                            <div>${userInput} USDC</div>
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
                                ${userInput * 1.5} USDC (50%)
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-5 text-sm">
                            {trsHash && (
                                <a
                                    href={`https://www.ao.link/#/message/${trsHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer flex items-center gap-x-3"
                                >
                                    Transfer link
                                    <SquareArrowOutUpRight size={15} />
                                </a>
                            )}
                            {betHash && (
                                <a
                                    href={`https://www.ao.link/#/message/${betHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer flex items-center gap-x-3"
                                >
                                    Prediction link
                                    <SquareArrowOutUpRight size={15} />
                                </a>
                            )}
                        </div>

                        <div className="mt-6 flex items-center w-full gap-x-4">
                            <div
                                className="w-3/6 border border-white p-1 rounded-lg  cursor-pointer text-center"
                                onClick={() => close()}
                            >
                                Close
                            </div>
                            <Button
                                onClick={handlePredictionAction}
                                className={`w-3/6 inline-flex items-center gap-2 rounded-md ${
                                    selectedIndex === 0
                                        ? 'bg-[#27ae60]'
                                        : 'bg-[#e64800]'
                                }  py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white `}
                            >
                                <div className="mx-auto">
                                    {btnState === 'Buy'
                                        ? `Buy ${option}`
                                        : btnState}
                                </div>
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default BuyModal;
