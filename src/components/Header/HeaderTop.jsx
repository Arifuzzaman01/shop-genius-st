"use client";
import { Heart, MenuIcon, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import SearchBtn from "./SearchBtn";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/app/store/features/cartDrawerSlice";

const HeaderTop = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className="relative">
      <div className="flex justify-between items-center py-3.5 px-2.5 gap-2">
        {/* logo area */}
        <div className="flex-1">
          {/* md:block */}
          <Link href={"/"} className="hidden md:block ">
            <Image
              src={"/shop-genius.png"}
              width={180}
              height={80}
              alt="Logo"
            />
          </Link>
          {/* sm screen */}
          <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden">
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
          <Link href={"/"}>
            <Image
              src={"/shop-genius.png"}
              width={180}
              height={80}
              alt="Logo"
              className="md:hidden"
            />
          </Link>
        </div>
        {/* Cart and user icons */}
        <div className="flex-1 flex justify-end gap-6">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden"
          >
            <Search />
          </button>
          <button
            onClick={() => dispatch(toggleDrawer())}
            className="relative cursor-pointer"
          >
            <ShoppingBag />
            <div className=" absolute -top-1 left-4 w-fit h-5 bg-primary py-0.5 px-1.5 rounded-full text-gray-100 text-[12px] p-0.5 text-center">
              {quantity}
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
      <div>
        {/* Overlay (মেনু ওপেন থাকলে পেছনের অংশ ঝাপসা বা কালো করার জন্য) */}
        <div
          className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300 ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setOpenMenu(false)}
        />

        {/* Mobile Menu Sidebar */}
        <div
          className={`md:hidden fixed top-0 left-0 w-2/3 h-screen bg-white shadow-sm z-50 transition-transform duration-500 ease-in-out transform ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center p-5">
            <Link href={"/"} onClick={() => setOpenMenu(false)}>
              <Image
                src={"/shop-genius.png"}
                width={150}
                height={60}
                alt="Logo"
              />
            </Link>
            <button
              onClick={() => setOpenMenu(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="text-[15px] ">
            <ul className="flex flex-col gap-1">
              {[
                "Home",
                "Shop",
                "Offer",
                "About",
                "Contact",
                "Free Delivery",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    onClick={() => setOpenMenu(false)}
                    className="block px-8 py-2 hover:font-semibold hover:bg-gray-100 hover:text-primary transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
