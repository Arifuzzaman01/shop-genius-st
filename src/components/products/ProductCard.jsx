import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-md p-1.5 border-2 border-gray-200 flex flex-col justify-between ">
      <Link href={`product/${product?._id}`} className="relative">
        <Image
          src={"/watchpack.avif"}
          width={200}
          height={300}
          alt={product?.productName}
          className="w-full 
      object-cover
      transform
      transition-all
      duration-500
      ease-out
      hover:scale-110
      will-change-transform rounded-md"

        />
        <span className="absolute top-1 right-1 hover:text-primary"><Heart size={20}/> </span>
        <span className="bg-primary rounded-full py-0.5 px-2 text-white absolute top-1 left-1">0% off</span>
      </Link>
      <div className="p-2 text-text_primary ">
        <h2 className=" text-[15px] font-medium line-clamp-2">
          {product?.productName}
        </h2>
        <div className="flex gap-2 text-[17px] my-2.5 items-center">
          <p className="font-bold  text-primary">BDT {product?.sellPrice}</p>
          <p className="font-bold  text-gray-400 line-through">
            BDT {product?.mrpPrice}
          </p>
        </div>
        <div>
          <button className="w-full text-sm bg-primary text-white py-1.5 rounded-sm hover:bg-primary/90 transition-colors duration-300">
            Buy Now
          </button>
          <button className="w-full text-sm   py-1.5 rounded-sm transition-colors duration-300 mt-2 border-2 border-primary text-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
