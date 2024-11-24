import { useState } from 'react';
import { HoverEffect } from './card';
import { CARDS, TOP_CARDS } from './config';
import AddPredictionModal from '../modal/AddPrediction';

const Cards = () => {
    const [open, setOpen] = useState(false);
    const [cardsData, setCardsData] = useState(CARDS);
    return (
        <>
            {open && (
                <AddPredictionModal
                    open={open}
                    setOpen={setOpen}
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                />
            )}
            <div className="px-10 mx-auto">
                <div className="grid grid-cols-4 pt-8  gap-4 rounded-lg">
                    {TOP_CARDS.map((elem, index) => (
                        <div
                            key={index}
                            className={`${
                                index === 0
                                    ? 'bg-topCard1'
                                    : index === 1
                                    ? 'bg-topCard2'
                                    : index === 2
                                    ? 'bg-topCard3'
                                    : 'bg-topCard4'
                            } rounded-lg px-3 py-5 font-semibold mb-12`}
                        >
                            {elem.title}
                        </div>
                    ))}
                </div>
                <div
                    onClick={() => setOpen(true)}
                    className="w-fit ml-auto mb-8 py-1 px-3 text-md cursor-pointer border rounded-lg font-semibold "
                >
                    + Add
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 pb-10">
                    {cardsData.map((elem, index) => (
                        <HoverEffect {...elem} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Cards;
