import React, { Dispatch, SetStateAction } from "react";
import { Brand } from "@/sanity.types";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: Dispatch<SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Brands</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand: Brand) => (
          <div
            key={brand?._id}
            onClick={() => setSelectedBrand(brand?.slug?.current as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedBrand && (
        <button
          onClick={() => setSelectedBrand(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default BrandList;
