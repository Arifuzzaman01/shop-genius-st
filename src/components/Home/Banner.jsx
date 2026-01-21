import React from "react";
import BannerCategory from "./BannerCategory";
import Image from "next/image";
// import BannerSlider from "./BannerSlider";

async function getBanners() {
  const res = await fetch(
    "https://ecommerce-saas-server-wine.vercel.app/api/v1/banner/website?status=active&sort=position",
    {
      headers: { "store-id": "0000129" },
      next: { revalidate: 3600, cache: "force-cache" },
    },
  );

  if (!res.ok) return null;
  const result = await res.json();
  return result?.data?.data || [];
}

const Banner = async () => {
  const banners = await getBanners();
  // console.log(banners, "banner image");
  return (
    <div className="flex gap-5 pt-3 ">
      <div className="hidden md:block flex-1 bg-white rounded-md border border-gray-100 shadow-sm ">
        <BannerCategory />
      </div>
      <div className="flex-3 w-full overflow-hidden z-10">
        {banners && banners.length > 0 ? (
          <div className="relative w-full h-[250px] md:h-full">
            <Image
              src={banners[0]?.image}
              alt={banners[0]?.title || "Promotion Banner"}
              width={900}
              height={600}
              priority
              className="object-cover rounded-lg z-10 w-full h-auto"
            />
          </div>
        ) : (
          <div className="w-full md:h-[500px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <p className="text-gray-400">Loading Banner...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
