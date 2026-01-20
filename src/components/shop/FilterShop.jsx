"use client";
import React from "react";

const FilterShop = ({
  categories,
  setSelectedCategories,
  selectedCategories,
  setSelectedSubCategories,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };
  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSubCategories((prev) => [...prev, value]);
    } else {
      setSelectedSubCategories((prev) => prev.filter((item) => item !== value));
    }
  };
  const handlePrice = (e) => {
    e.preventDefault();
    setMinPrice(e.target.min.value);
    setMaxPrice(e.target.max.value);
    e.target.reset();
  };
  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    document.querySelector("form").reset();
  };
  return (
    <div className="space-y-5">
      <div className="bg-white p-3 shadow-md rounded-md space-y-5">
        <h2 className="font-semibold text-text_primary">Filter by Price</h2>

        <form onSubmit={handlePrice}>
          <div className="flex gap-3 mb-2.5">
            <input
              name="min"
              type="number"
              defaultValue={minPrice}
              placeholder="Min"
              className="border border-gray-300 rounded-md p-3 w-full outline-0"
            />

            <input
              name="max"
              type="number"
              defaultValue={maxPrice}
              placeholder="Max"
              className="border border-gray-300 rounded-md p-3 w-full outline-0"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="text-white p-1.5 w-full bg-primary rounded-md"
            >
              Apply
            </button>

            <button
              onClick={handleClear}
              type="button"
              className="text-white p-1.5  w-full bg-gray-400 rounded-md"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-3 shadow-md rounded-md space-y-2.5">
        <h2 className="font-semibold text-text_primary">Filter by Category</h2>

        {categories?.map((cat) => (
          <div key={cat._id} className="flex gap-2 items-center">
            <input
              onChange={handleCategoryChange}
              checked={selectedCategories?.includes(cat.parentCategory)}
              type="checkbox"
              value={cat.parentCategory}
              className="w-4 h-4"
            />{" "}
            <p className="text-gray-700 font-medium">{cat.parentCategory}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 shadow-md rounded-md space-y-2.5">
        <h2 className="font-semibold text-text_primary">
          Filter by Sub-category
        </h2>

        {categories?.map((category) =>
          category?.subCategory?.map((subCat) => (
            <div key={subCat?._id} className="flex gap-2 items-center">
              <input
                onChange={handleSubCategoryChange}
                value={subCat?.title}
                type="checkbox"
                className="w-4 h-4"
              />{" "}
              <p className="text-gray-700 font-medium">{subCat?.title}</p>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default FilterShop;
