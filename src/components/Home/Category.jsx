"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Handbag } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

// ২. CSS ইমপোর্ট
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const categories = [
  { _id: "cat001", _image: "/images/gadget.png", _categoryName: "Gadget" },
  {
    _id: "cat002",
    _image: "/images/electronics.png",
    _categoryName: "Electronics",
  },
  { _id: "cat003", _image: "/images/fashion.png", _categoryName: "Fashion" },
  {
    _id: "cat004",
    _image: "/images/home-appliance.png",
    _categoryName: "Home Appliance",
  },
  {
    _id: "cat005",
    _image: "/images/beauty-health.png",
    _categoryName: "Beauty & Health",
  },
  {
    _id: "cat006",
    _image: "/images/groceries.png",
    _categoryName: "Groceries",
  },
  {
    _id: "cat007",
    _image: "/images/sports.png",
    _categoryName: "Sports & Outdoor",
  },
];

const Category = () => {
  return (
    <div className="py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
        <Link
          href={"/categories"}
          className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          See More
        </Link>
      </div>

      <Swiper
        navigation={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={2}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000, 
          disableOnInteraction: false, 
        }}
        modules={[Pagination, Navigation, Autoplay]}
        
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="category-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="p-6 flex flex-col justify-center items-center bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer gap-3 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                {/* {category._image ? (
                  <Image src={category._image} alt={category._categoryName} width={40} height={40} />
                ) : (
                  <Handbag size={32} />
                )} */}
                <Handbag size={32} />
              </div>
              <h3 className="text-sm font-medium text-gray-700">
                {category._categoryName}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
