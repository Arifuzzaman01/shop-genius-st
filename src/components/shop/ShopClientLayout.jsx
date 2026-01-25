// components/shop/ShopClientLayout.jsx
"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import FilterShop from "./FilterShop";
import ShopBody from "./ShopBody";
import MobileFilter from "./MobileFilter";
import { getProducts } from '@/app/utils/products';

export default function ShopClientLayout({ categories, allProducts, meta }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const [sortPrice, setSortPrice] = useState('');
  const [filterObject, setFilterObject] = useState({
    categoryPath: '',
    subCategory: '',
    minPrice: '',
    maxPrice: ''
  });
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  
  // Calculate total pages from meta data
  const totalPages = meta?.total ? Math.ceil(meta?.total / 10) : 1;
  const currentPage = parseInt(searchParams.get('page')) || 1;
  // const limit = meta?.limit || 10;

  // Handle filter changes from FilterShop
  const handleFilterChange = async (newFilterObject) => {
    setFilterObject(newFilterObject);
    
    // Only fetch if there are actual filters
    if (newFilterObject.categoryPath || newFilterObject.subCategory || 
        newFilterObject.minPrice || newFilterObject.maxPrice) {
      setLoading(true);
      try {
        const result = await getProducts(newFilterObject);
        setFilteredProducts(result.data || []);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    } else {
      // If no filters, show all products
      setFilteredProducts(allProducts);
    }
  };

  // Effect to handle URL parameter changes
  useEffect(() => {
    const categoryPath = searchParams.get('categoryPath') || '';
    const subCategory = searchParams.get('subCategory') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    
    const newFilterObject = {
      categoryPath,
      subCategory,
      minPrice,
      maxPrice
    };
    
    // Update state and trigger fetch if filter object changed or page changed
    if (JSON.stringify(filterObject) !== JSON.stringify(newFilterObject) || currentPage !== page) {
      setFilterObject(newFilterObject);
      
      // Prepare filter object with pagination parameters
      const filterWithPagination = {
        ...newFilterObject,
        page: page,
        limit: 10
      };
      
      if (categoryPath || subCategory || minPrice || maxPrice) {
        setLoading(true);
        getProducts(filterWithPagination)
          .then(result => {
            setFilteredProducts(result.data || []);
          })
          .catch(error => {
            console.error('Error fetching filtered products:', error);
            setFilteredProducts([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // Fetch all products with pagination if no filters
        setLoading(true);
        getProducts({ page: page, limit: 10 })
          .then(result => {
            setFilteredProducts(result.data || []);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            setFilteredProducts([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [searchParams, filterObject, allProducts, currentPage]);

  const sortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (sortPrice === "high-to-low") {
      return products.sort((a, b) => b.salePrice - a.salePrice);
    }
    if (sortPrice === "low-to-high") {
      return products.sort((a, b) => a.salePrice - b.salePrice);
    }
    return products;
  }, [filteredProducts, sortPrice,currentPage]);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      {/* Desktop Filter Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 sticky top-24 h-fit">
        <FilterShop categories={categories} onFilterChange={handleFilterChange} />
      </aside>

      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
          <button 
            onClick={() => setOpenFilter(true)}
            className="md:hidden bg-primary px-4 py-2 text-white text-sm font-medium rounded shadow-sm flex items-center gap-2"
          >
            <span>Filter Options</span>
          </button>
          
          <h3 className="text-gray-600 font-medium">
            Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products 
            {meta?.total > filteredProducts.length && ` out of ${meta.total}`}
          </h3>

          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
            <select
              onChange={(e) => setSortPrice(e.target.value)}
              className="py-2 px-3 border border-gray-200 rounded-md text-sm text-gray-700 outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Default Sorting</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="low-to-high">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {sortedProducts.length > 0 ? (
            <ShopBody products={sortedProducts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">No products match your filters</p>
              <button onClick={() => window.location.href='/shop'} className="mt-4 text-primary font-semibold hover:underline">Reset all filters</button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 pb-8">
            <button
              onClick={async () => {
                if (currentPage > 1) {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('page', currentPage - 1);
                  params.set('limit', 10);
                  
                  // Prepare filter object with pagination parameters
                  const filterWithPagination = {
                    categoryPath: params.get('categoryPath') || '',
                    subCategory: params.get('subCategory') || '',
                    minPrice: params.get('minPrice') || '',
                    maxPrice: params.get('maxPrice') || '',
                    page: currentPage - 1,
                    limit: 10
                  };
                  
                  // Update loading state
                  setLoading(true);
                  
                  // Fetch new products
                  try {
                    const result = await getProducts(filterWithPagination);
                    setFilteredProducts(result.data || []);
                  } catch (error) {
                    console.error('Error fetching filtered products:', error);
                    setFilteredProducts([]);
                  } finally {
                    setLoading(false);
                  }
                  
                  // Update URL
                  router.push(`${pathname}?${params.toString()}`);
                }
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={async () => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('page', pageNum);
                  params.set('limit', 10);
                                
                  // Prepare filter object with pagination parameters
                  const filterWithPagination = {
                    categoryPath: params.get('categoryPath') || '',
                    subCategory: params.get('subCategory') || '',
                    minPrice: params.get('minPrice') || '',
                    maxPrice: params.get('maxPrice') || '',
                    page: pageNum,
                    limit: 10
                  };
                                
                  // Update loading state
                  setLoading(true);
                                
                  // Fetch new products
                  try {
                    const result = await getProducts(filterWithPagination);
                    setFilteredProducts(result.data || []);
                  } catch (error) {
                    console.error('Error fetching filtered products:', error);
                    setFilteredProducts([]);
                  } finally {
                    setLoading(false);
                  }
                                
                  // Update URL
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className={`w-10 h-10 border rounded-md transition-colors ${
                  currentPage === pageNum 
                  ? "bg-primary text-white border-primary" 
                  : "hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={async () => {
                if (currentPage < totalPages) {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('page', currentPage + 1);
                  params.set('limit', 10);
                  
                  // Prepare filter object with pagination parameters
                  const filterWithPagination = {
                    categoryPath: params.get('categoryPath') || '',
                    subCategory: params.get('subCategory') || '',
                    minPrice: params.get('minPrice') || '',
                    maxPrice: params.get('maxPrice') || '',
                    page: currentPage + 1,
                    limit: 10
                  };
                  
                  // Update loading state
                  setLoading(true);
                  
                  // Fetch new products
                  try {
                    const result = await getProducts(filterWithPagination);
                    setFilteredProducts(result.data || []);
                  } catch (error) {
                    console.error('Error fetching filtered products:', error);
                    setFilteredProducts([]);
                  } finally {
                    setLoading(false);
                  }
                  
                  // Update URL
                  router.push(`${pathname}?${params.toString()}`);
                }
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <MobileFilter isOpen={openFilter} setIsOpen={setOpenFilter}>
        <FilterShop categories={categories} onFilterChange={handleFilterChange} />
      </MobileFilter>
    </div>
  );
}