"use client";
import { getCategories } from "@/app/utils/categories";
import { ChevronDown, Laptop, Shirt, Smartphone, Watch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeaderBottom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);
  // console.log(categories);
  const pathName = usePathname().split('/')[1]
  // const path = pathName.split('/')[1];
  console.log(pathName);
  return (
    <div className="hidden border-t border-b-2 border-gray-300 py-1.5 md:flex justify-baseline items-center px-3">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`w-80 relative ${pathName === 'shop' && 'hidden'}`}
      >
        <button className="flex justify-between  bg-primary rounded-md px-5 py-2.5 text-white text-sm font-semibold w-5/6">
          Browse Categories
          <span>
            <ChevronDown size={20} />
          </span>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl rounded-b-lg z-50 py-2 animate-in fade-in slide-in-from-top-2 transition-all duration-500">
            <ul className="flex flex-col">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={`/shop?categoryPath=${cat?.path}`}
                    className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                  >
                    {/* {cat.image} */}
                    <span className="font-medium">{cat?.parentCategory}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <nav className="flex-4 text-[15px] ">
        <ul className="flex gap-5 justify-start items-center">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/shop"}>All Product</Link>
          </li>
          <li>
            <Link href={"/offer"}> Offer</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/free-delivery"}>Free Delivery</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
