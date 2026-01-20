"use client";
import { Filter } from "lucide-react";
import React from "react";

const ShopHeader = ({ products, setOpenFilter, setSortPrice }) => {
  return (
    <div className="flex justify-between items-center p-5 bg-white border border-gray-300 rounded-md">
      <button
        onClick={() => setOpenFilter(true)}
        className="md:hidden bg-primary p-2 text-white flex gap-1 items-center rounded-sm"
      >
        <Filter size={20} />
        Filter
      </button>
      <h3 className=" hidden md:block text-gray-500 font-semibold">
        Total {products?.length} items For You
      </h3>
      <div className="flex gap-4 items-center">
        <p className="text-gray-600">Short by:</p>
        <select
          onChange={(e) => setSortPrice(e.target.value)}
          name="short-product"
          className="py-2.5 px-2 border text-gray-800 border-gray-400 rounded-md w-40 outline-0"
        >
          <option className="text-gray-600 text-sm ">Sort by Price</option>
          <option className="text-gray-600 text-sm" value="high-to-low">
            High to Low
          </option>
          <option className="text-gray-600 text-sm" value="low-to-high">
            Low to High
          </option>
        </select>
      </div>
    </div>
  );
};

export default ShopHeader;
