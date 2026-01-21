import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartBtn from "./CartBtn";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md p-1.5 border-2 border-gray-200 flex flex-col justify-between max-h-fit ">
      <Link href={`product/${product?.path}`} className="relative">
        {product?.imageURLs.length !== 0 ? (
          <Image
            src={product?.imageURLs[0]}
            width={200}
            height={300}
            alt={product?.name}
            className="w-full 
      object-cover
      transform
      transition-all
      duration-500
      ease-out
      hover:scale-105
      will-change-transform rounded-md"
          />
        ) : (
          <Image
            src={"/emptyImage.png"}
            width={200}
            height={300}
            alt={product?.name}
            className="w-full 
      object-cover
      transform
      transition-all
      duration-500
      ease-out
      hover:scale-105
      will-change-transform rounded-md"
          />
        )}
        <span className="absolute top-1 right-1 hover:text-primary">
          <Heart size={20} />{" "}
        </span>
        <span className="bg-primary rounded-full py-0.5 px-2 text-white absolute top-1 left-1">
          {" "}
          {Math.floor(
            ((product?.productPrice - product?.salePrice) /
              product?.productPrice) *
              100,
          )}
          % off
        </span>
      </Link>
      <div className="p-2 text-text_primary ">
        <h2 className=" text-[15px] font-medium line-clamp-2">
          {product?.name}
        </h2>
        <div className="flex gap-2 text-[17px] my-2.5 items-center">
          <p className="font-bold  text-primary">BDT {product?.salePrice}</p>
          <p className="font-bold  text-gray-400 line-through">
            BDT {product?.productPrice}
          </p>
        </div>
        <CartBtn product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
