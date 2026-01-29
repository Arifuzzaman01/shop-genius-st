"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FilterShop from "./FilterShop";
import ShopBody from "./ShopBody";
import MobileFilter from "./MobileFilter";
import { getProducts } from "@/app/utils/products";

export default function ShopClientLayout({ categories, allProducts, meta }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openFilter, setOpenFilter] = useState(false);
  const [sortPrice, setSortPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);

  // URL থেকে বর্তমান স্টেটগুলো নেওয়া
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = meta?.limit || 16;
  const totalPages = meta?.total ? Math.ceil(meta?.total / limit) : 1;

  // কমন ফাংশন: URL আপডেট এবং ডাটা ফেচ করা
  const updateStore = useCallback(async (paramsObject) => {
    setLoading(true);
    try {
      const result = await getProducts(paramsObject);
      setFilteredProducts(result.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ১. ফিল্টার পরিবর্তন হলে (অটোমেটিক পেজ ১-এ নিয়ে যাবে)
  const handleFilterChange = (newFilter) => {
    const params = new URLSearchParams();
    // নতুন ফিল্টারগুলো সেট করা
    if (newFilter.categoryPath)
      params.set("categoryPath", newFilter.categoryPath);
    if (newFilter.subCategory) params.set("subCategory", newFilter.subCategory);
    if (newFilter.minPrice) params.set("minPrice", newFilter.minPrice);
    if (newFilter.maxPrice) params.set("maxPrice", newFilter.maxPrice);

    // ফিল্টার বদলালে সবসময় পেজ ১ এ যাবে
    params.set("page", "1");
    params.set("limit", limit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  // ২. পেজিনেশন হ্যান্ডলার (বর্তমান ফিল্টার ধরে রাখবে)
  const handlePagination = (status, pageNum) => {
    const params = new URLSearchParams(searchParams.toString());
    let targetPage = currentPage;

    if (status === "prev") targetPage = currentPage - 1;
    else if (status === "next") targetPage = currentPage + 1;
    else if (status === "objBtn") targetPage = pageNum;

    params.set("page", targetPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // ৩. URL Change ওয়াচ করা (সব ডাটা ফেচিং এখন এখান থেকে হবে)
  useEffect(() => {
    const currentParams = {
      categoryPath: searchParams.get("categoryPath") || "",
      subCategory: searchParams.get("subCategory") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      page: currentPage,
      limit: limit,
    };

    updateStore(currentParams);
  }, [searchParams, currentPage, updateStore, limit]);

  // ৪. সর্টিং লজিক (Client Side)
  const sortedProducts = useMemo(() => {
    let products = [...filteredProducts];
    if (sortPrice === "high-to-low") {
      return products.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0));
    }
    if (sortPrice === "low-to-high") {
      return products.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
    }
    return products;
  }, [filteredProducts, sortPrice]);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 md:px-0">
      {/* Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 sticky top-24 h-fit">
        <FilterShop
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </aside>

      <div className="flex-1 space-y-6">
        {/* Header Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
          <button
            onClick={() => setOpenFilter(true)}
            className="md:hidden bg-[#00801a] px-4 py-2 text-white text-sm font-medium rounded shadow-sm"
          >
            Filter Options
          </button>

          <h3 className="text-gray-600 font-medium">
            Showing{" "}
            <span className="text-[#00801a] font-bold">
              {sortedProducts.length}{" "}
            </span>{" "}
            {meta.total > limit ? <span>: Out of Product {meta.total}</span>:''}
          </h3>

          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              onChange={(e) => setSortPrice(e.target.value)}
              className="py-2 px-3 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#00801a]"
            >
              <option value="">Default Sorting</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="low-to-high">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid / Loading State */}
        <div
          className={`min-h-[400px] transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}
        >
          {sortedProducts.length > 0 ? (
            <ShopBody products={sortedProducts} />
          ) : (
            !loading && (
              <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-400 text-lg">
                  No products match your filters
                </p>
                <button
                  onClick={() => router.push(pathname)}
                  className="mt-4 text-[#00801a] font-semibold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 pb-8 flex-wrap">
            <button
              onClick={() => handlePagination("prev")}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 border rounded-md disabled:opacity-30 hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePagination("objBtn", pageNum)}
                  disabled={loading}
                  className={`w-10 h-10 border rounded-md transition-colors ${
                    currentPage === pageNum
                      ? "bg-[#00801a] text-white border-[#00801a]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => handlePagination("next")}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 border rounded-md disabled:opacity-30 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <MobileFilter isOpen={openFilter} setIsOpen={setOpenFilter}>
        <FilterShop
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </MobileFilter>
    </div>
  );
}
