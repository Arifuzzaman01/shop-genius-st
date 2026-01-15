import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderBottom = () => {
  return (
    <div className="border-t border-b-2 border-gray-300 py-1.5 flex justify-baseline items-center gap-5 px-3">
      <button className="flex justify-between flex-1 bg-primary rounded-md px-5 py-2 text-white">
        Browse Categories
        <span>
          <ChevronDown size={20} />
        </span>
      </button>
      <nav className="flex-5 text-[15px] ">
        <ul className="flex gap-5 justify-start items-center">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"all-product"}>All Product</Link>
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
