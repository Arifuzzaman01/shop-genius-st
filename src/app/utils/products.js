// const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("/products.json");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

export const products = async () => {
  try {
    const response = await fetch("/products.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
