import React from "react";
import BannerCategory from "./BannerCategory";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex gap-5 pt-3 ">
      <div className="flex-1 bg-white rounded-md">
        <BannerCategory />
      </div>
      <div className="flex-3">
        <Image
          src={"/banner.png"}
          alt="Banner"
          width={700}
          height={400}
          className="w-full h-[500px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
