import { cache } from "react";

export const getCategories = async () => {
  try {
    const response = await fetch(
      "https://ecommerce-saas-server-wine.vercel.app/api/v1/category/website/0000129",
      {
        next: { revalidate: 3600, cache: "force-cache" },
      },
    );
    const data = await response.json();
    return data?.data || [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};
