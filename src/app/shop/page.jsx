// app/shop/page.jsx
import { getCategories } from "../utils/categories";
import { getProducts } from "../utils/products";
import ShopClientLayout from "@/components/shop/ShopClientLayout";

const ShopPage = async () => {
  // সার্ভারে ডাটা ফেচ করুন
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <div className="my-7 px-4">
      {/* সব স্টেট এবং ফিল্টার লজিক এই ক্লায়েন্ট লেআউটে থাকবে */}
      <ShopClientLayout 
        categories={categories} 
        allProducts={allProducts} 
      />
    </div>
  );
};

export default ShopPage;