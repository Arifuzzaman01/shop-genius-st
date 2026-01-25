export const getProducts = async (filters = {}) => {
  try {
    const {
      categoryPath,
      subCategory,
      minPrice,
      maxPrice,
      page = 1,
      limit = 16,
    } = filters;

    const params = new URLSearchParams();

    if (categoryPath && typeof categoryPath === "string") {
      categoryPath.split(",").forEach((val) => {
        if (val.trim()) params.append("categoryPath", val.trim());
      });
    }

    if (subCategory && typeof subCategory === "string") {
      subCategory.split(",").forEach((val) => {
        if (val.trim()) params.append("subCategory", val.trim());
      });
    }

    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const finalUrl = `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?${params.toString()}`;

    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "store-id": "0000129",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    return data?.data || { data: [], meta: {} };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: [], meta: {} };
  }
};
