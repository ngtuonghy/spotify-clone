"use client";
import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}
const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-[100px] h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[4px] ">
        <RadixSlider.Range className="absolute bg-white hover:bg-green-500 rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block w-3.5 h-3.5 bg-green-500 rounded-full" />
    </RadixSlider.Root>
  );
};

export default Slider;
