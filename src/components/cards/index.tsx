import { useState } from 'react';
import { HoverEffect } from './card';
import { CARDS, TOP_CARDS } from './config';
import AddPredictionModal from '../modal/AddPrediction';
import { TrendingUp } from 'lucide-react';
import { Input } from '@headlessui/react';

const Cards = () => {
    const [open, setOpen] = useState(false);
    const [cardsData, setCardsData] = useState(CARDS);
    const [search, setSearch] = useState('');
    const finalData = search
        ? cardsData.filter((elem) =>
              elem.title.toLowerCase().includes(search.toLowerCase())
          )
        : cardsData;

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
                <div className="px-2 grid grid-cols-4 pt-8  gap-4 rounded-lg">
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
                            } rounded-lg pl-3 py-5 flex items-center justify-between font-semibold mb-12`}
                        >
                            <div>{elem.title}</div>
                            <img
                                src={elem.img}
                                alt="img"
                                height={90}
                                width={90}
                            />
                        </div>
                    ))}
                </div>
                <div className="px-2 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <div className="bg-blue-500 rounded-lg p-2 flex items-center gap-x-2 font-semibold text-white">
                            <TrendingUp size={17} />
                            Top
                        </div>
                        <Input
                            value={search}
                            placeholder="Search by market"
                            className=" block w-full rounded-lg  bg-white/5 py-2 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border border-white/25"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div
                        onClick={() => setOpen(true)}
                        className="py-1 px-3 text-md cursor-pointer border rounded-lg font-semibold "
                    >
                        + Add
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 pb-10">
                    {finalData.length > 0 ? (
                        finalData.map((elem, index) => (
                            <HoverEffect {...elem} key={index} />
                        ))
                    ) : (
                        <div className="text-white">
                            No Prediction data found
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cards;
