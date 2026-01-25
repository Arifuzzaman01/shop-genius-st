"use client";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { closeDrawer } from "@/app/store/features/cartDrawerSlice";
import Link from "next/link";
import Image from "next/image";
import { removeFromCart } from "@/app/store/features/cartSlice";

const CartDrawer = () => {
  const { isOpen } = useSelector((state) => state.cartDrawer);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart(productId));
  };
  // console.log(products);
  return (
    <>
      <div
        onClick={() => dispatch(closeDrawer())}
        className={`fixed inset-0 bg-black/40  z-[99] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[100] shadow-2xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[#00801a] p-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeDrawer())}
            className="hover:rotate-90 transition-transform"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-160px)]">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="flex gap-4 p-3 border rounded-lg relative group"
            >
              <div className="w-16 h-16 relative overflow-hidden rounded bg-gray-100">
                {product?.imageURLs && product?.imageURLs.length > 0 ? (
                  <Image
                    src={product.imageURLs[0]}
                    fill
                    alt={product?.name || "product"}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[10px] text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-1">
                  {product?.name}
                </h4>
                <p className="font-bold mt-1 text-primary">
                  ৳ {product?.salePrice}
                </p>
                <div className="flex items-center border w-fit rounded mt-2">
                  <button className="px-2 py-1">
                    <Minus size={14} />
                  </button>
                  <span className="px-3">3</span>
                  <button className="px-2 py-1 border-l">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveProduct(product._id)}
                className="text-red-500 absolute bottom-3 right-3 p-1.5 border border-red-100 rounded hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer with Checkout Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <Link
            onClick={() => dispatch(closeDrawer())}
            href="check-out"
            className="w-full bg-[#00801a] text-white flex justify-between items-center px-6 py-4 rounded-md font-bold text-lg hover:bg-green-700 transition-colors"
          >
            <span>Proceed To Checkout</span>
            <span>৳ {totalAmount}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
