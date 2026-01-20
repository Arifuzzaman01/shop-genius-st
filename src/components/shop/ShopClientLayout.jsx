"use client";
import { useState, useMemo } from "react";
import FilterShop from "./FilterShop";
import ShopBody from "./ShopBody";
import MobileFilter from "./MobileFilter";

export default function ShopClientLayout({ categories, allProducts }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ফিল্টার লজিক: যখনই selectedCategories চেঞ্জ হবে, filteredProducts আপডেট হবে
  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return allProducts;
    
    return allProducts.filter((product) =>
      product?.category?.some((cat) => selectedCategories.includes(cat))
    );
  }, [selectedCategories, allProducts]);
// console.log(selectedCategories);
  return (
    <div className="relative flex gap-6">
      {/* ১. ডেস্কটপ ফিল্টার (এখানেই আপনার এরর হচ্ছিল, এখন প্রপস দেওয়া হয়েছে) */}
      <div className="hidden md:block w-64 shrink-0">
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* ২. মেইন প্রোডাক্ট লিস্ট */}
      <div className={`flex-1 `}>
        <ShopBody 
          setOpenFilter={setOpenFilter} 
          products={filteredProducts} // ফিল্টার করা ডাটা পাঠানো হচ্ছে
        />
      </div>

      {/* ৩. মোবাইল ফিল্টার ড্রয়ার */}
      <MobileFilter isOpen={openFilter} setIsOpen={setOpenFilter}>
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </MobileFilter>
    </div>
  );
}