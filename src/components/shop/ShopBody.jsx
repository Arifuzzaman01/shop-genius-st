// import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Filter } from "lucide-react";

const ShopBody = ({ products }) => {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ShopBody;
