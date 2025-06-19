import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Brand } from "@/sanity.types";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "gratis Ongkir",
    description: "Gratis biaya kirim untuk pesanan diatas Rp.500.000",
    icon: <Truck size={45} />,
  },
  {
    title: "Pengembalian tanpa biaya",
    description: "pengembalian barang tanpa biaya tambahan",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Layanan",
    description: "Layanan 24/7",
    icon: <Headset size={45} />,
  },
  {
    title: "Garansi",
    description: "Garansi jika Produk Rusak",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="mb-10 lg:pb-20 bg-shop_light_bg p-6 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Cari Berdasarkan Merek</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand: Brand) => (
          <Link
            href={`/brand/${brand?.slug?.current}`}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md
             overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brandImage"
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
