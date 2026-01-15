import { Handbag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const categories = [
  {
    _id: "cat001",
    _image: "https://example.com/images/gadget.png",
    _categoryName: "Gadget",
  },
  {
    _id: "cat002",
    _image: "https://example.com/images/electronics.png",
    _categoryName: "Electronics",
  },
  {
    _id: "cat003",
    _image: "https://example.com/images/fashion.png",
    _categoryName: "Fashion",
  },
  {
    _id: "cat004",
    _image: "https://example.com/images/home-appliance.png",
    _categoryName: "Home Appliance",
  },
  {
    _id: "cat005",
    _image: "https://example.com/images/beauty-health.png",
    _categoryName: "Beauty & Health",
  },
  {
    _id: "cat006",
    _image: "https://example.com/images/groceries.png",
    _categoryName: "Groceries",
  },
  {
    _id: "cat007",
    _image: "https://example.com/images/sports.png",
    _categoryName: "Sports & Outdoor",
  },
];

const Category = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-2xl">Category</h1>
        <Link
          href={"/categories"}
          className="px-3 py-1.5 border border-gray-300 rounded-md"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-7 gap-5 my-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-5 flex flex-col justify-center items-center  bg-white rounded-lg shadow-lg hover:shadow-md cursor-pointer gap-2"
          >
            {/* active after get api */}
            {/* {category._image ? (
            <Image
              src={category._image}
              alt={category._categoryName}
              width={100}
              height={100}
            />
          ) : <Handbag size={40} />} */}
            <Handbag size={40} /> {/* remove after api */}
            <h3 className="text-sm text-gray-700">{category._categoryName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
