"use client";
import { products } from "@/app/utils/products";
import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Filter } from "lucide-react";

const ShopBody = ({setOpenFilter}) => {
  const [allProducts, setAllProducts] = useState();
  useEffect(() => {
    (async () => {
      setAllProducts(await products());
    })();
  }, []);
  console.log(allProducts);
  return (
    <div className="space-y-7">
      <div className="flex justify-between items-center p-5 bg-white border border-gray-300 rounded-md">
        <button onClick={()=>setOpenFilter(true)} className="md:hidden bg-primary p-2 text-white flex gap-1 items-center rounded-sm"><Filter size={20}/>Filter</button>
        <h3 className=" hidden md:block text-gray-500 font-semibold">Total 6 items For You</h3>
        <div className="flex gap-4 items-center">
          <p className="text-gray-600">Short by:</p>
          <select
            name="short-product"
            className="py-2.5 px-2 border text-gray-800 border-gray-400 rounded-md w-40"
          >
            <option className="text-gray-600 text-sm">Sort by Price</option>
            <option className="text-gray-600 text-sm" value="high-to-low">
              High to Low
            </option>
            <option className="text-gray-600 text-sm" value="low-to-high">
              Low to High
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopBody;
