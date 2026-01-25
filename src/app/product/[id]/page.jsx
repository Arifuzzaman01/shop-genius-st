"use client";
import { addToCart, incrementQuantity } from "@/app/store/features/cartSlice";
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
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
  });
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/path/${id}`,
      );
      const res = await response.json();
      setProduct(res?.data);
    };
    fetchProduct();
  }, []);

  console.log(product?.variant);

  const imageContainerRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = e.clientY - top; //
    const yPercent = (y / height) * 100;

    const img = imageContainerRef.current.querySelector("img");
    if (img) {
      img.style.transformOrigin = `${x}% ${yPercent}%`;
    }
  };
  const handleMouseLeave = () => {
    const img = imageContainerRef.current?.querySelector("img");
    if (img) {
      img.style.transformOrigin = "center center";
    }
  };
  const handleAddToCart = () => {
    // console.log(quantity);
    dispatch(addToCart({ product, quantity }));
  };
  const handleUpdateQuantity = (newQty) => {
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  const findVariant = product?.variant?.find(
    (v) => v?.attributes?.Color === activeVariant,
  );
  const productImage =
    activeVariant !== null && findVariant?.image
      ? findVariant.image
      : product?.imageURLs?.[0];
  return (
    <div className="max-w-6xl mx-auto">
      <div className=" bg-white border border-gray-300 rounded-2xl flex flex-col md:flex-row gap-6 my-5 ">
        <div className="flex-2">
          <div
            ref={imageContainerRef}
            className="overflow-hidden cursor-pointer  relative mb-3"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {productImage ? (
              <Image
                key={productImage}
                src={productImage}
                width={500}
                height={400}
                alt={product?.name || "product image"}
                className="transition-transform duration-300 hover:scale-[1.5] bg-cover rounded-l-2xl"
                style={{ transformOrigin: "center center" }}
              />
            ) : (
              <div className="w-[500px] h-[400px] bg-gray-100 flex items-center justify-center">
                Loading...
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 p-1.5">
            {product?.variant?.length > 0 &&
              product?.variant?.map((v) => (
                <div onClick={()=> setActiveVariant(v?.attributes?.Color)} key={v?._id}>
                  <Image
                    src={v?.image}
                    width={80}
                    height={80}
                    alt="variant image"
                    className="border p-1.5 border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-transform"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="p-5 w-full flex-3 space-y-5">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-text_primary flex gap-2 items-center">
              Category:{" "}
              <span className="flex items-center gap-1 text-purple-700 text-[16px] font-semibold">
                <SquareCheckBig size={16} />
                {product?.category?.map((cat, i) => (
                  <Link
                    key={i}
                    href={`/shop?categoryPath=${encodeURIComponent(product?.categoryPath[i])}`}
                    className="hover:underline"
                  >
                    {cat}
                    {i < product.category.length - 1 ? ", " : ""}
                  </Link>
                ))}
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
          <h1 className="text-2xl md:text-3xl font-semibold text-text_primary ">
            {product?.name}
          </h1>
          <div className="flex gap-3.5 justify-center md:justify-start">
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
          {/* pricing */}
          <div className="flex justify-center md:justify-start gap-5 items-center mb-4">
            <p className="text-gray-500 line-through">
              {activeVariant !== null
                ? findVariant?.productPrice
                : product?.productPrice}
            </p>
            <p className="text-[#EA580C] text-4xl font-bold">
              TK{" "}
              {activeVariant !== null
                ? findVariant?.salePrice
                : product?.salePrice}
            </p>
            <p className="px-2.5 text-sm py-0.5 bg-red-600 rounded-full text-white">
              {activeVariant !== null
                ? findVariant?.discount
                : Math.floor(
                    ((product?.productPrice - product?.salePrice) /
                      product?.productPrice) *
                      100,
                  )}
              % Off
            </p>
          </div>
          {/* variant */}

          <div>
            <p className="font-semibold pb-1">Color</p>
            {product?.variant && product?.variant.length > 0 && (
            <div className="flex justify-center md:justify-start gap-1.5">
              {product?.variant?.map((v, i) => (
                <button
                  onClick={() => setActiveVariant(v?.attributes?.Color)}
                  className={`border border-gray-400 px-3 py-1 rounded-sm ${activeVariant === v?.attributes?.Color ? "text-red-600 border-red-500" : ""}`}
                  key={i}
                >
                  {v?.attributes?.Color}
                </button>
              ))}
            </div>
          )}
          </div>

          <div className="flex gap-3 items-center border-2 border-gray-300 p-2 rounded-md w-fit mx-auto md:mx-0">
            <button
              onClick={() => handleUpdateQuantity(quantity + 1, product)}
              className="cursor-pointer"
            >
              <Plus />
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => handleUpdateQuantity(quantity - 1, product)}
              disabled={product?.quantity <= 1}
              className="cursor-pointer"
            >
              <Minus />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={"check-out"}
              className="w-full px-3 py-3 bg-primary rounded-[8px] text-white flex items-center justify-center hover:bg-green-700 gap-2 transition-all duration-200"
            >
              <Briefcase /> অর্ডার করুন
            </Link>
            <button
              onClick={handleAddToCart}
              className="w-full px-3 py-3 bg-[#CA8A04] rounded-[8px] text-white flex items-center justify-center hover:bg-[#be8303] gap-2 transition-all duration-200"
            >
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
      <ProductOverView product={product} />
    </div>
  );
};

export default ProductPage;
