"use client";
import { getCategories } from "@/app/utils/categories";
import { ChevronRight, Handbag, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BannerCategory = () => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    (async () => {
      setAllCategories(await getCategories());
    })();
  }, []);
  // console.log(categories," categories");
  const categories = allCategories.slice(0, 7).reverse();
  return (
    <div className="border border-gray-300 text-gray-900 bg-white rounded-b-lg ">
      <button className="flex gap-3 items-center bg-primary w-full text-white p-3">
        <LayoutDashboard size={20} /> Shop By Department
      </button>
      <div className="">
        {categories?.map((category) => (
          <div
            onMouseEnter={() => setHoveredCategoryId(category._id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
            key={category._id}
            className="relative flex gap-2.5 justify-between items-center border-b border-gray-300  p-2.5"
          >
            <div className="flex gap-3.5 items-center">
              {category.image ? (
                <Image
                  src={category?.imageURLs}
                  alt={category.parentCategory}
                  width={80}
                  height={80}
                />
              ) : (
                <Handbag size={30} />
              )}
              <h2 className="capitalize">{category.parentCategory}</h2>
            </div>
            <ChevronRight size={20} />
            {hoveredCategoryId === category._id && (
              <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-xl rounded-r-md z-50 py-2 animate-in fade-in slide-in-from-left-2 transition-all">
               
                <div className="absolute -left-2 top-0 w-2 h-full bg-transparent" />

                {category.subCategory.map((subCat) => (
                  <div
                    key={subCat._id}
                    className="px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors text-sm border-b border-gray-50 last:border-0"
                  >
                    {subCat?.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCategory;
