"use client";
import { useState, useMemo, useEffect } from "react";
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
  
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  // filtered products based on selected filters
  const getFilteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        product?.category?.some((cat) => selectedCategories.includes(cat));

      const matchSubCategory =
        selectedSubCategories.length === 0 ||
        product?.subCategory?.some((subCat) =>
          selectedSubCategories.includes(subCat)
        );

      const matchPrice =
        (!minPrice || product.salePrice >= Number(minPrice)) &&
        (!maxPrice || product.salePrice <= Number(maxPrice));

      return matchCategory && matchSubCategory && matchPrice;
    });
  }, [selectedCategories, selectedSubCategories, allProducts, minPrice, maxPrice]);

  // sorted products based on sortPrice
  const sortedProducts = useMemo(() => {
    let products = [...getFilteredProducts];
    if (sortPrice === "low-to-high") {
      products.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortPrice === "high-to-low") {
      products.sort((a, b) => b.salePrice - a.salePrice);
    }
    return products;
  }, [getFilteredProducts, sortPrice]);

  // pagination effect to reset current page on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedSubCategories, minPrice, maxPrice, sortPrice]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  // pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="relative flex flex-col md:flex-row gap-6">
      {/* desktop filter sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>

      <div className="flex-1 space-y-7">
        {/* Shop Header (Sorting and Count) */}
        <ShopHeader
          products={sortedProducts} 
          setOpenFilter={setOpenFilter}
          setSortPrice={setSortPrice}
        />

        {/* Product List */}
        {paginatedProducts.length > 0 ? (
          <ShopBody products={paginatedProducts} />
        ) : (
          <div className="text-center py-20 text-gray-500">
            No products found matching your criteria.
          </div>
        )}

        {/* ৫. Pagination UI Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 pb-10">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 border rounded-md transition-colors ${
                    currentPage === pageNum 
                    ? "bg-primary text-white border-primary" 
                    : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilter isOpen={openFilter} setIsOpen={setOpenFilter}>
        <FilterShop
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </MobileFilter>
    </div>
  );
}