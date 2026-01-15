import { ChevronRight, Handbag, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React from "react";

const shopCategory = [
  {
    id: 1,
    parentCategory: "gadget",
    subCategory: ["headphone", "speaker", "smartwatch", "powerbank"],
  },
  {
    id: 2,
    parentCategory: "electronics",
    subCategory: ["mobile", "laptop", "tablet", "camera"],
  },
  {
    id: 3,
    parentCategory: "fashion",
    subCategory: ["mens_wear", "womens_wear", "kids_wear", "footwear"],
  },
  {
    id: 4,
    parentCategory: "home_appliance",
    subCategory: [
      "refrigerator",
      "washing_machine",
      "microwave",
      "air_conditioner",
    ],
  },
  {
    id: 5,
    parentCategory: "beauty_health",
    subCategory: ["skincare", "haircare", "makeup", "fitness"],
  },
  {
    id: 6,
    parentCategory: "groceries",
    subCategory: ["rice", "oil", "snacks", "beverages"],
  },
  {
    id: 7,
    parentCategory: "sports_outdoor",
    subCategory: ["cricket", "football", "gym_equipment", "camping"],
  },
];

const BannerCategory = () => {
  return (
    <div className="border border-gray-300 text-gray-900 bg-white rounded-b-lg">
      <button className="flex gap-3 items-center bg-primary w-full text-white p-3">
        <LayoutDashboard size={20} /> Shop By Department
      </button>
      <div>
        {shopCategory.map((category) => (
          <div
            key={category.id}
            className="flex gap-2.5 justify-between items-center border-b border-gray-300 p-2.5"
          >
            <div className="flex gap-3.5 items-center">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.parentCategory}
                  width={80}
                  height={80}
                />
              ) : (
                <Handbag size={30} />
              )}
              <h2 className="capitalize">{category.parentCategory}</h2>
            </div>
            <ChevronRight  size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCategory;
