import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
            <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
            <p className="font-semibold tracking-wide text-base">
              Memuat Halaman Toko . . .
            </p>
          </div>
        }
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
