"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BannerSlider = ({ banners }) => {
    // console.log(banners, "banners in slider");
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full md:h-[500px] rounded-lg shadow-md"
    >
      {banners.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="relative w-full h-[250px] md:h-full">
            <Image
              src={item.image}
              alt={item.title || "Promotion Banner"}
              fill
              priority
              className="object-cover rounded-lg z-10"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;