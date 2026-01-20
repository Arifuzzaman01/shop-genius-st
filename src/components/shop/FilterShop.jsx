"use client";
import React from "react";

const FilterShop = ({ categories, setSelectedCategories, selectedCategories }) => {
  
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div className="space-y-5">
      {/* Category Section */}
      <div className="bg-white p-4 shadow-sm border rounded-md space-y-3">
        <h2 className="font-bold border-b pb-2">Filter by Category</h2>
        {categories?.map((cat) => (
          <div key={cat._id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              value={cat.parentCategory}
              checked={selectedCategories.includes(cat.parentCategory)}
              onChange={handleCategoryChange}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-gray-700">{cat.parentCategory}</span>
          </div>
        ))}
      </div>
      
      {/* Clear Button (Optional) */}
      {selectedCategories.length > 0 && (
        <button 
          onClick={() => setSelectedCategories([])}
          className="text-xs text-red-500 underline"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterShop;