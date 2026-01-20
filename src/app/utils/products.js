// app/utils/getProducts.js
export const getProducts = async () => {
  try {
    const response = await fetch(
      "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website",
      {
        method: "GET",
        headers: { 
          "store-id": "0000129",
          "Content-Type": "application/json"
        },
        next: { revalidate: 3600 }, 
      }
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};