import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
type SliderProps = {
    min_price: number;
    max_price: number;
    sliderValue: number[];
    setSliderValue: React.Dispatch<React.SetStateAction<number[]>>;
};
const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderProps
>(
    (
        {
            min_price,
            max_price,
            sliderValue,
            setSliderValue,
            className,
            ...props
        },
        ref
    ) => (
        <SliderPrimitive.Root
            min={min_price}
            max={max_price}
            step={1}
            value={sliderValue}
            onValueChange={(value) => {
                setSliderValue(value);
            }}
            ref={ref}
            className="w-3/6 relative flex touch-none select-none items-center"
            {...props}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#1e293bcc]">
                <SliderPrimitive.Range className="absolute h-full bg-topCard4" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-[#A5A5A5] ring-offset-background transition-colors focus:outline-none" />
        </SliderPrimitive.Root>
    )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
