"use client";
import { Heart, MenuIcon, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import SearchBtn from "./SearchBtn";
import Link from "next/link";

const HeaderTop = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  return (
    <div className="relative">
      <div className="flex justify-between items-center py-3.5 px-2.5">
        {/* logo area */}
        <div className="flex-1">
          {/* md:block */}
          <Link href={"/"} className="hidden md:block">
            <Image
              src={"/shop-genius.png"}
              width={180}
              height={80}
              alt="Logo"
            />
          </Link>
          {/* sm screen */}
          <button className="md:hidden">
            <MenuIcon />
          </button>
        </div>
        {/* Search bar */}
        <div className="flex-2">
          {/* md screen */}
          <div className="hidden md:block">
            <SearchBtn />
          </div>
          {/* sm screen */}
          <Image
            src={"/shop-genius.png"}
            width={180}
            height={80}
            alt="Logo"
            className="md:hidden"
          ></Image>
        </div>
        {/* Cart and user icons */}
        <div className="flex-1 flex justify-end gap-6">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden"
          >
            <Search />
          </button>
          <button className="relative cursor-pointer">
            <ShoppingBag />
            <div className=" absolute -top-1 left-4 w-fit h-5 bg-primary py-0.5 px-1.5 rounded-full text-gray-100 text-[12px] p-0.5 text-center">
              {" "}
              0
            </div>
          </button>
          <button className="relative cursor-pointer">
            <Heart />
            <div className=" absolute -top-1 left-4 w-fit h-5 bg-primary py-0.5 px-1.5 rounded-full text-gray-100 text-[12px] p-0.5 text-center">
              {" "}
              0
            </div>
          </button>
          <button className="mx-2 bg-gray-300 rounded-full p-2 cursor-pointer">
            <User />
          </button>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full
            transition-all duration-300 ease-in-out
            md:hidden px-2.5 pb-3.5 bg-white/90 backdrop-blur-sm
            flex gap-2 items-center
            ${
              searchOpen
                ? "max-h-48 opacity-100 translate-y-0 mt-1 py-2.5"
                : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
            }`}
      >
        <div className="flex-1">
          <SearchBtn />
        </div>

        <button className="w-fit" onClick={() => setSearchOpen(!searchOpen)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default HeaderTop;
