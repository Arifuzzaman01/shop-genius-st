// app/utils/getProducts.js
export const getProducts = async (filters = {}) => {
  try {
    const { categoryPath, subCategory, minPrice, maxPrice, page = 1, limit = 10 } = filters;
    
    // URL Query String তৈরি করা
    const params = new URLSearchParams();
    if (categoryPath) params.append("categoryPath", categoryPath);
    if (subCategory) params.append("subCategory", subCategory);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    params.append("page", page);
    params.append("limit", limit);

    const response = await fetch(
      `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?${params.toString()}`,
      {
        method: "GET",
        headers: { 
          "store-id": "0000129",
          "Content-Type": "application/json"
        },
        next: { revalidate: 60 }, // ডাটা ক্যাশ হবে ১ মিনিটের জন্য
      }
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    return data?.data || { data: [], meta: {} };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: [], meta: {} };
  }
};