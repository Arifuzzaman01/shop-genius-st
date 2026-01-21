// app/shop/page.jsx
import { getCategories } from "../utils/categories";
import { getProducts } from "../utils/products";
import ShopClientLayout from "@/components/shop/ShopClientLayout";

const ShopPage = async () => {
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <div className="my-7 px-4">
      <ShopClientLayout 
        categories={categories} 
        allProducts={allProducts} 
      />
    </div>
  );
};

export default ShopPage;