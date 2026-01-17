import React from "react";

const FilterShop = () => {
  return (
    <div className="space-y-5">
      <div className="bg-white p-3 shadow-md rounded-md space-y-5">
        <h2 className="font-semibold text-text_primary">Filter by Price</h2>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-300 rounded-md p-3 w-full outline-0"
          />
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-300 rounded-md p-3 w-full outline-0"
          />
        </div>
        <div className="flex gap-3">
          <button className="text-white p-1.5 w-full bg-primary rounded-md">
            Apply
          </button>
          <button className="text-white p-1.5  w-full bg-gray-400 rounded-md">
            Clear
          </button>
        </div>
      </div>
      <div className="bg-white p-3 shadow-md rounded-md space-y-2.5">
        <h2 className="font-semibold text-text_primary">Filter by Category</h2>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-700 font-medium">Gadget</p>
        </div>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-700 font-medium">Device</p>
        </div>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-700 font-medium">Watch</p>
        </div>
      </div>
      <div className="bg-white p-3 shadow-md rounded-md space-y-2.5">
        <h2 className="font-semibold text-text_primary">Filter by Sub-category</h2>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-800 font-medium">HeadPhone</p>
        </div>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-700 font-medium">Mobile</p>
        </div>
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4" /> <p className="text-gray-700 font-">SmartWatch</p>
        </div>
      </div>
    </div>
  );
};

export default FilterShop;
