import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormattor = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("id-ID", {
    currency: "IDR",
    style: "currency",
    minimumFractionDigits: 0,
  });
  return (
    <span className={cn("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormattor;
