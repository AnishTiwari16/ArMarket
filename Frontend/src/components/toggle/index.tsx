import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const IconToggle = ({
    onToggle,
}: {
    onToggle?: (toggled: boolean) => void;
}) => {
    const [toggled, setToggled] = useState(true);

    const handleToggle = () => {
        const newState = !toggled;
        setToggled(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };
    return (
        <button
            className={`relative h-4 w-9 cursor-pointer rounded-full duration-200`}
            onClick={handleToggle}
            style={{
                backgroundColor: toggled ? '#27ae60' : '#fff3',
            }}
        >
            <span
                className={cn(
                    `absolute left-0 top-[-4px] flex items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200`,
                    toggled
                        ? 'translate-x-full transform'
                        : 'translate-x-0 transform',
                    toggled ? 'h-4 w-4' : 'h-4 w-4',
                    toggled ? 'm-1' : 'm-1'
                )}
            >
                <span className="relative flex h-full w-full">
                    <Check
                        size={10}
                        strokeWidth={3}
                        className={cn(
                            'absolute left-0 top-0 h-full w-full p-1 text-red-500 transition-opacity duration-200',
                            toggled ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    <X
                        size={10}
                        strokeWidth={3}
                        className={cn(
                            'absolute left-0 top-0 h-full w-full p-0.5 text-[#24252d50] transition-opacity duration-200',
                            toggled ? 'opacity-0' : 'opacity-100'
                        )}
                    />
                </span>
            </span>
        </button>
    );
};

export default IconToggle;
