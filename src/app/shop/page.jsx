"use client"
import FilterShop from '@/components/shop/FilterShop';
import ShopBody from '@/components/shop/ShopBody';
import React, { useState } from 'react';

const ShopPage = () => {
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div className='relative flex gap-6 my-7 px-4'>
            
         
            <div className='hidden md:block w-64 '>
                <FilterShop />
            </div>

           
            <div className={`flex-1 transition-all duration-300 ${openFilter ? "blur-xs md:blur-none" : ""}`}>
                <ShopBody setOpenFilter={setOpenFilter} />
            </div>

           
            {openFilter && (
                <div 
                    onClick={() => setOpenFilter(false)} 
                    className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
                />
            )}

            
            <div className={`
                fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl p-5 
                transform transition-transform duration-300 ease-in-out md:hidden
                ${openFilter ? "translate-x-0" : "-translate-x-full"}
            `}>
               
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                    <button 
                        onClick={() => setOpenFilter(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="overflow-y-auto h-[calc(100vh-100px)]">
                    <FilterShop />
                </div>
            </div>

        </div>
    );
};

export default ShopPage;