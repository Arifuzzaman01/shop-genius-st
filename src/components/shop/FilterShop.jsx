// components/shop/FilterShop.jsx
"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterShop = ({ categories, onFilterChange }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // সরাসরি URL থেকে মানগুলো নেওয়া হচ্ছে (Decode সহ)
  const selectedCategories = decodeURIComponent(
    searchParams.get("categoryPath") || "",
  )
    .split(",")
    .filter(Boolean);
  const selectedSubCategories = decodeURIComponent(
    searchParams.get("subCategory") || "",
  )
    .split(",")
    .filter(Boolean);

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.length > 0) {
      params.set(key, Array.isArray(value) ? value.join(",") : value);
    } else {
      params.delete(key);
    }
    
    // Update URL
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
    
    // Lift up the updated filter object
    const updatedFilterObject = {
      categoryPath: key === 'categoryPath' ? (Array.isArray(value) ? value.join(',') : value) : (selectedCategories.length > 0 ? selectedCategories.join(',') : ''),
      subCategory: key === 'subCategory' ? (Array.isArray(value) ? value.join(',') : value) : (selectedSubCategories.length > 0 ? selectedSubCategories.join(',') : ''),
      minPrice: key === 'minPrice' ? value : (searchParams.get("minPrice") || ''),
      maxPrice: key === 'maxPrice' ? value : (searchParams.get("maxPrice") || '')
    };
    
    onFilterChange(updatedFilterObject);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    let newSelected = [...selectedCategories];
    if (checked) newSelected.push(value);
    else newSelected = newSelected.filter((item) => item !== value);
    updateFilters("categoryPath", newSelected);
  };

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    let newSelected = [...selectedSubCategories];
    if (checked) newSelected.push(value);
    else newSelected = newSelected.filter((item) => item !== value);
    updateFilters("subCategory", newSelected);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    const min = e.target.min.value;
    const max = e.target.max.value;
    
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");
    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");

    router.push(`${pathName}?${params.toString()}`, { scroll: false });
    
    // Lift up the updated filter object
    const updatedFilterObject = {
      categoryPath: selectedCategories.length > 0 ? selectedCategories.join(',') : '',
      subCategory: selectedSubCategories.length > 0 ? selectedSubCategories.join(',') : '',
      minPrice: min || '',
      maxPrice: max || ''
    };
    
    onFilterChange(updatedFilterObject);
  };

  const handleClear = () => {
    router.push(pathName);
    
    // Lift up empty filter object
    const emptyFilterObject = {
      categoryPath: '',
      subCategory: '',
      minPrice: '',
      maxPrice: ''
    };
    
    onFilterChange(emptyFilterObject);
  };

  return (
    <div className="space-y-5">
      {/* Price Filter */}
      <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-md">
        <h2 className="font-semibold mb-4 text-gray-800">Filter by Price</h2>
        <form onSubmit={handlePrice} className="space-y-3">
          <div className="flex gap-2">
            <input
              name="min"
              type="number"
              defaultValue={searchParams.get("minPrice") || ""}
              placeholder="Min"
              className="border border-gray-200 rounded p-2 w-full outline-none focus:border-primary"
            />
            <input
              name="max"
              type="number"
              defaultValue={searchParams.get("maxPrice") || ""}
              placeholder="Max"
              className="border border-gray-200 rounded p-2 w-full outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="text-white text-sm py-2 px-4 w-full bg-primary rounded hover:bg-primary/90 transition-all"
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              type="button"
              className="text-gray-600 text-sm py-2 px-4 w-full bg-gray-100 rounded hover:bg-gray-200"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-md space-y-3">
        <h2 className="font-semibold text-gray-800 border-b pb-2">
          Categories
        </h2>
        <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
          {categories?.map((cat) => (
            <label
              key={cat._id}
              className="flex gap-3 items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                value={cat?.path}
                checked={selectedCategories.includes(cat?.path)}
                onChange={handleCategoryChange}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-gray-600 group-hover:text-primary transition-colors">
                {cat.parentCategory}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-md space-y-3">
        <h2 className="font-semibold text-gray-800 border-b pb-2">
          Sub Categories
        </h2>
        <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
          {categories
            ?.flatMap((cat) => cat.subCategory || [])
            .map((sub) => (
              <label
                key={sub._id}
                className="flex gap-3 items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={sub?.title}
                  checked={selectedSubCategories.includes(sub?.title)}
                  onChange={handleSubCategoryChange}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-gray-600 group-hover:text-primary transition-colors">
                  {sub?.title}
                </span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterShop;
