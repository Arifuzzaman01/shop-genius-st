"use client";
import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const productsInCart = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* left side: Shipping Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Fill the form below with correct information to confirm the order
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="MD ARIFUZZAMAN RAKIB"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="01339313066"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select your area
              </label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-primary transition-all">
                <option>Inside Dhaka City (ঢাকা সিটির ভিতর)</option>
                <option>Outside Dhaka City (ঢাকা সিটির বাইরে)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Note (Optional)
              </label>
              <textarea
                placeholder="Note..."
                rows={3}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-primary transition-all"
              />
            </div>
          </form>
        </div>

        {/* right side: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Product List */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Product List</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {productsInCart.map((product) => (
                <div
                  key={product?._id}
                  className="flex gap-4 p-3 border border-gray-100 rounded-lg group"
                >
                  <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <Image
                      src="/galaxyA17.avif"
                      alt="product"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {product?.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product?.mrpPrice}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        ৳{product?.salePrice}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md h-8 self-center">
                    <button className="px-2 hover:bg-gray-100">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-bold">3</span>
                    <button className="px-2 hover:bg-gray-100">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Calculation */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">৳ {totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-800">৳ 0</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <span className="text-xl font-black text-green-700">
                    {totalAmount}
                  </span>
                  <p className="text-[10px] text-gray-400 italic">
                    VAT included, where applicable
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-3">Payment Info :</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4 accent-primary"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="text-sm font-bold text-gray-700 uppercase">
                    CASH ON DELIVERY
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4 accent-primary"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <span className="text-sm font-bold text-gray-700 uppercase">
                    PAYMENT METHOD
                  </span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-[#00801a] text-white font-bold py-3.5 rounded hover:bg-green-700 uppercase transition-all tracking-wider cursor-pointer">
                Confirm Order
              </button>
              <button className="w-full bg-[#94a3b8] text-white font-bold py-3.5 rounded hover:bg-gray-500 transition-all">
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
