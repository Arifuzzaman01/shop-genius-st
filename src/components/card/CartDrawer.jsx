// components/CartDrawer.jsx
"use client";
import { useSelector, useDispatch } from "react-redux";

import { X, Trash2, Plus, Minus } from "lucide-react";
import { closeDrawer } from "@/app/store/features/cardSlice";
import Link from "next/link";

const CartDrawer = () => {
  const { isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(isOpen);

  return (
    <>
      {/* Background Overlay */}
      <div 
        onClick={() => dispatch(closeDrawer())}
        className={`fixed inset-0 bg-black/40  z-[99] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer Container */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[100] shadow-2xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header - আপনার স্ক্রিনশট অনুযায়ী সবুজ ব্যাকগ্রাউন্ড */}
        <div className="bg-[#00801a] p-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={() => dispatch(closeDrawer())} className="hover:rotate-90 transition-transform">
            <X size={28} />
          </button>
        </div>

        {/* Product Items List */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-160px)]">
            {/* এখানে আপনার কার্ট আইটেম ম্যাপ করে দেখাবেন */}
            <div className="flex gap-4 p-3 border rounded-lg relative group">
                <img src="/powerbank.jpg" alt="p" className="w-16 h-16 object-cover" />
                <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">MI powerbank 20000mah, Xiaomi Redmi...</h4>
                    <p className="font-bold mt-1 text-primary">৳ 1100</p>
                    <div className="flex items-center border w-fit rounded mt-2">
                        <button className="px-2 py-1"><Minus size={14}/></button>
                        <span className="px-3">3</span>
                        <button className="px-2 py-1 border-l"><Plus size={14}/></button>
                    </div>
                </div>
                <button className="text-red-500 absolute bottom-3 right-3 p-1.5 border border-red-100 rounded hover:bg-red-50">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>

        {/* Footer with Checkout Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <Link href='check-out' className="w-full bg-[#00801a] text-white flex justify-between items-center px-6 py-4 rounded-md font-bold text-lg hover:bg-green-700 transition-colors">
            <span>Proceed To Checkout</span>
            <span>৳ 54300</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;