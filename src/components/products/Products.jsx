import ProductCard from "./ProductCard";
import Link from "next/link";
import { getProducts } from "@/app/utils/products";

const Products = async () => {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold ">New Arrival</h1>
        <Link
          href={"/shop"}
          className="px-3 py-1.5 border border-gray-300 rounded-md"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
