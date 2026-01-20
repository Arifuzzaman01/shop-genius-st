"use client";
import { addToCart } from '@/app/store/features/cartSlice';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

const CartBtn = ({ product }) => {
     const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
    return (
        <div>
          <Link href={"/check-out"}>
            <button
              onClick={handleAddToCart}
              className="w-full text-sm bg-primary text-white py-1.5 rounded-sm hover:bg-primary/90 transition-colors duration-300"
            >
              Buy Now
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full text-sm   py-1.5 rounded-sm transition-colors duration-300 mt-2 border-2 border-primary text-primary"
          >
            Add to Cart
          </button>
        </div>
    );
};

export default CartBtn;