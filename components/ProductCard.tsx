import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] border-dark_blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform
              bg-shop_light_bg hoverEffect
               ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <AddToWishlistButton product={product} />
        {product?.status === "sale" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
           border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green 
           group-hover:text-shop_light_green hoverEffect"
          >
            Beli!
          </p>
        )}
        {product?.status === "new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
           border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green 
           group-hover:text-shop_light_green hoverEffect"
          >
            baru!
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 
          rounded-full group-hover:border-shop_orange hover:text-shop_dark_green 
          hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col">
        {product?.categories && (
          <p className="uppercase truncate text-xs text-shop_light_text">
            {product.categories?.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm truncate">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={12}
                key={index}
                className={
                  index < 4
                    ? "text-shop_lighter_green"
                    : "text-shop_lighter_text"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <div className="text-shop_light_text text-sm tracking-wide">
            5 Reviews
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium">Stok</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop_light_green font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Habis"}
          </p>
        </div>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
