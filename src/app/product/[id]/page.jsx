"use client";
import ProductOverView from "@/components/products/ProductOverView";
import {
  Briefcase,
  Heart,
  Minus,
  Phone,
  Plus,
  Share2,
  ShoppingCart,
  SquareCheckBig,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/products.json");
      const res = await response.json();
      setProducts(res);
    };
    fetchProduct();
  }, []);
  const product = products.filter((product) => product._id === id)[0];

  //   console.log(filterProduct);
  //   Image Scale

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className=" bg-white border border-gray-300 rounded-2xl flex gap-8 my-5 ">
        <div
          className="overflow-hidden cursor-pointer flex-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={() =>
            setZoomStyle({ transformOrigin: "center center" })
          }
        >
          <Image
            src="/power-bank.avif"
            width={500}
            height={400}
            alt="product image"
            style={zoomStyle}
            className="transition-transform duration-300 hover:scale-[1.3] bg-cover rounded-l-2xl"
          />
        </div>
        <div className="p-5 w-full flex-3 space-y-5">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-text_primary flex gap-2 items-center">
              Category:{" "}
              <span className="flex items-center gap-1 text-purple-700 text-[16px] font-semibold">
                <SquareCheckBig size={16} /> {product?.subCategory}
              </span>
            </p>
            <div className="flex gap-4">
              <div className="bg-gray-300 p-1.5 rounded-md">
                <Heart size={20} className="text-primary " />
              </div>
              <div className="bg-gray-200 p-1.5 rounded-md">
                <Share2 size={20} className="text-primary " />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-text_primary ">
            {product?.productName}
          </h1>
          <div className="flex gap-3.5">
            <span className="flex gap-3.5 items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  size={20}
                  key={index}
                  className="fill-amber-300 text-amber-400"
                />
              ))}
            </span>
            <p>
              {product?.stock > 0 ? (
                <span className="text-primary font-semibold">In Stock</span>
              ) : (
                <span className="text-gray-700 line-through font-semibold">
                  Out of Stock
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-5 items-center mb-10">
            <p className="text-gray-500 line-through">{product?.mrpPrice}</p>
            <p className="text-[#EA580C] text-4xl font-bold">
              TK {product?.sellPrice}
            </p>
            <p className="px-2.5 text-sm py-0.5 bg-red-600 rounded-full text-white">
              {Math.floor(
                ((product?.mrpPrice - product?.sellPrice) / product?.mrpPrice) *
                  100
              )}
              % Off
            </p>
          </div>
          <div className="flex gap-3 items-center border-2 border-gray-300 p-2 rounded-md w-fit">
            <button className="cursor-pointer">
              <Plus />
            </button>
            <p>{1}</p>
            <button className="cursor-pointer">
              <Minus />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full px-3 py-3 bg-primary rounded-[8px] text-white flex items-center justify-center hover:bg-green-700 gap-2 transition-all duration-200">
              <Briefcase /> অর্ডার করুন
            </button>
            <button className="w-full px-3 py-3 bg-[#CA8A04] rounded-[8px] text-white flex items-center justify-center hover:bg-[#be8303] gap-2 transition-all duration-200">
              <ShoppingCart /> কার্ডে যোগ করুন{" "}
            </button>
            <button className="w-full px-3 py-3 bg-[#075e54] rounded-[8px] text-white flex items-center justify-center hover:bg-[#03584f] gap-2 transition-all duration-200">
              হোয়ার্সঅ্যাপ অর্ডার
            </button>
            <button className="w-full px-3 py-0.5 bg-[#0c983f] rounded-[8px] text-white flex items-center justify-center hover:bg-[#029237] gap-2 transition-all duration-200">
              <Phone className="fill-gray-400" />
              <p className="flex flex-col justify-center items-center">
                <span className="text-[10px]">সরাসরি কল করুন </span>
                <span className="font-bold text-gray-300 text-xl -mt-1">
                  01339313060
                </span>
              </p>
            </button>
          </div>
        </div>
      </div>
      <ProductOverView product={product}/>
    </div>
  );
};

export default ProductPage;
