"use client";
import { ChevronDown, Laptop, Shirt, Smartphone, Watch } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const categories = [
  {
    name: "Electronics",
    icon: <Smartphone size={18} />,
    href: "/category/electronics",
  },
  { name: "Laptops", icon: <Laptop size={18} />, href: "/category/laptops" },
  { name: "Fashion", icon: <Shirt size={18} />, href: "/category/fashion" },
  {
    name: "Accessories",
    icon: <Watch size={18} />,
    href: "/category/accessories",
  },
];
const HeaderBottom = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden border-t border-b-2 border-gray-300 py-1.5 md:flex justify-baseline items-center gap-5 px-3">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex-1 w-full"
      >
        <button className="flex justify-between w-full bg-primary rounded-md px-5 py-2.5 text-white text-sm font-semibold ">
          Browse Categories
          <span>
            <ChevronDown size={20} />
          </span>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-1/4 bg-white border border-gray-200 shadow-xl rounded-b-lg z-50 py-2 animate-in fade-in slide-in-from-top-2 transition-all duration-500">
            <ul className="flex flex-col">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                  >
                    {cat.icon}
                    <span className="font-medium">{cat.name}</span>
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
            <Link href={"shop"}>All Product</Link>
          </li>
          <li>
            <Link href={"offer"}> Offer</Link>
          </li>
          <li>
            <Link href={"about"}>About</Link>
          </li>
          <li>
            <Link href={"contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"free-delivery"}>Free Delivery</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
