import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Input,
} from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastStyles } from '../../lib/helper';
import { useMutation } from '@tanstack/react-query';
import { handleTrxApi } from '../../api';
import useGlobalStore from '../../store';
import RotatingDotsLoader from '../loaders';
import { queryClient } from '../..';

const AddPredictionModal = ({
    open,
    setOpen,
    cardsData,
    setCardsData,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cardsData: any;
    setCardsData: React.Dispatch<React.SetStateAction<any>>;
}) => {
    function close() {
        setOpen(false);
    }
    const { userWallet, isToggled } = useGlobalStore();
    const [predictionDetails, setPredictionDetails] = useState({
        question: '',
        description: '',
        outcomes: [''],
        min_price: 1,
        max_price: 100,
    });
    const { mutateAsync: handleApiTrx, isPending } = useMutation({
        mutationFn: handleTrxApi,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['balance'] });
            setCardsData([
                ...cardsData,
                {
                    title: predictionDetails.question,
                    desc: predictionDetails.description,
                    outcomes: predictionDetails.outcomes,
                    yes: '0%',
                    no: '0%',
                },
            ]);
            toast.success('Prediction created successfully 🎉', toastStyles);
            close();
        },
    });
    const handleSubmit = async () => {
        try {
            if (isToggled) {
            } else {
                await handleApiTrx({
                    wallet: userWallet.wallet,
                    data: JSON.stringify(predictionDetails),
                });
            }
        } catch (e) {
            toast.error('Error creating prediction', toastStyles);
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
                            Create Prediction
                        </DialogTitle>
                        <div className="flex items-start font-medium pt-4 pb-2 text-[15px]">
                            Question*
                        </div>
                        <Input
                            value={predictionDetails.question}
                            placeholder="Add prediction question here"
                            className=" w-full block rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                            onChange={(e) => {
                                setPredictionDetails({
                                    ...predictionDetails,
                                    question: e.target.value,
                                });
                            }}
                        />
                        <div className="flex items-start font-medium pt-4 pb-2 text-[15px]">
                            Description*
                        </div>
                        <Input
                            value={predictionDetails.description}
                            placeholder="Add description"
                            className=" w-full block rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                            onChange={(e) => {
                                setPredictionDetails({
                                    ...predictionDetails,
                                    description: e.target.value,
                                });
                            }}
                        />
                        <div className="flex items-start font-medium pt-4 pb-2 text-[15px]">
                            Outcome*
                        </div>
                        <Input
                            value={predictionDetails.outcomes}
                            placeholder="Yes, No"
                            className=" w-full block rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                            onChange={(e) => {
                                setPredictionDetails({
                                    ...predictionDetails,
                                    outcomes: e.target.value.split(','),
                                });
                            }}
                        />
                        <div className="flex items-center justify-between gap-x-4 text-[15px] pt-5">
                            <div>
                                <div className="pb-2">Min bet amount</div>
                                <Input
                                    type="number"
                                    value={predictionDetails.min_price}
                                    placeholder="$1"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full block rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                                    onChange={(e) => {
                                        setPredictionDetails({
                                            ...predictionDetails,
                                            min_price: parseInt(e.target.value),
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <div className="pb-2">Max bet amount</div>
                                <Input
                                    type="number"
                                    value={predictionDetails.max_price}
                                    placeholder="$100"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full block rounded-lg  bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                                    onChange={(e) => {
                                        setPredictionDetails({
                                            ...predictionDetails,
                                            max_price: parseInt(e.target.value),
                                        });
                                    }}
                                />
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
                                className={`w-3/6 inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold  bg-white/10 shadow-inner shadow-white/10 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white `}
                            >
                                <div
                                    className="mx-auto"
                                    onClick={() => {
                                        if (!isPending) {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    {isPending ? (
                                        <RotatingDotsLoader />
                                    ) : (
                                        'Proceed'
                                    )}
                                </div>
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AddPredictionModal;
