"use client";
import { useState, useMemo } from "react";
import FilterShop from "./FilterShop";
import ShopBody from "./ShopBody";
import MobileFilter from "./MobileFilter";
import ShopHeader from "./ShopHeader";

export default function ShopClientLayout({ categories, allProducts }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const getFilteredProducts = useMemo(() => {
    if (
      selectedCategories.length === 0 &&
      selectedSubCategories.length === 0 &&
      !minPrice &&
      !maxPrice
    ) {
      return allProducts;
    }

    return allProducts.filter((product) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        product?.category?.some((cat) => selectedCategories.includes(cat));

      const matchSubCategory =
        selectedSubCategories.length === 0 ||
        product?.subCategory?.some((subCat) =>
          selectedSubCategories.includes(subCat),
        );

      const matchPrice =
        (!minPrice || product.salePrice >= Number(minPrice)) &&
        (!maxPrice || product.salePrice <= Number(maxPrice));

      return matchCategory && matchSubCategory && matchPrice;
    });
  }, [
    selectedCategories,
    selectedSubCategories,
    allProducts,
    minPrice,
    maxPrice,
  ]);
  console.log(sortPrice);
  const filteredProducts = useMemo(() => {
    let products = [...getFilteredProducts];

    if (sortPrice === "low-to-high") {
      products.sort((a, b) => a.salePrice - b.salePrice);
    }

    if (sortPrice === "high-to-low") {
      products.sort((a, b) => b.salePrice - a.salePrice);
    }

    return products;
  }, [getFilteredProducts, sortPrice]);

  return (
    <div className="relative flex gap-6">
      <div className="hidden md:block w-64 shrink-0">
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>

      <div className={`flex-1 space-y-7`}>
        <ShopHeader
          products={filteredProducts}
          setOpenFilter={setOpenFilter}
          setSortPrice={setSortPrice}
        />
        <ShopBody products={filteredProducts} />
      </div>

      <MobileFilter isOpen={openFilter} setIsOpen={setOpenFilter}>
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </MobileFilter>
    </div>
  );
}
