import Banner from '@/components/Home/Banner';
import Category from '@/components/Home/Category';
import Products from '@/components/products/Products';
import React from 'react';

const HomePage = () => {
  return (
    <div className='space-y-5'>
      <Banner />
      <Category />
      <Products />
    </div>
  );
};

export default HomePage;