import { getCategories } from "../utils/categories";
import { getProducts } from "../utils/products";
import ShopClientLayout from "@/components/shop/ShopClientLayout";
import { Suspense } from "react";

const ShopPageContent = async ({ searchParams }) => {
  const categories = await getCategories();
  const params = await searchParams;

  // Extract filter parameters from URL
  const categoryPathParam = params?.categoryPath || "";
  const subCategoryParam = params?.subCategory || "";
  const minPriceParam = params?.minPrice || "";
  const maxPriceParam = params?.maxPrice || "";
  const pageParam = params?.page ? parseInt(params.page, 10) : 1;
  
  // Fetch filtered products from API
  const filteredProducts = await getProducts({
    categoryPath: categoryPathParam,
    subCategory: subCategoryParam,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    page: pageParam,
    limit: 16,
  });

  return (
    <div className="my-7 px-4">
      <ShopClientLayout
        categories={categories}
        allProducts={filteredProducts.data}
        meta={filteredProducts.meta}
      />
    </div>
  );
};

const ShopPage = ({ searchParams }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageContent searchParams={searchParams} />
    </Suspense>
  );
};

export default ShopPage;
