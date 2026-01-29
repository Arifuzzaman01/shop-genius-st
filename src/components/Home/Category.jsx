"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Handbag } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getCategories } from "@/app/utils/categories";

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);
  // console.log(categories);
  return (
    <div className="pt-5">
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
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
        }}
        className="category-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="py-5">
            <div className=" h-32 w-40 py-5 flex flex-col justify-center items-center bg-white rounded-xl border border-gray-300 shadow-md  cursor-pointer gap-1.5 text-center ">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                {category.imageURLs ? (
                  <Image src={category?.imageURLs} alt={category?.parentCategory} width={36} height={36} />
                ) : (
                  <Handbag size={32} />
                )}
                {/* <Handbag size={32} /> */}
              </div>
              <h3 className="text-sm font-medium text-gray-700">
                {category.parentCategory}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
