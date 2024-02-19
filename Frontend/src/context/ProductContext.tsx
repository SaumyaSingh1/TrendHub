// // ProductContext.js
// import { createContext, useEffect, useState } from "react";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContext;
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductContext = createContext();

export const ProductProvider = ({ initialCategory, children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(initialCategory || '');

  const location = useLocation();

  useEffect(() => {
    // Update the category when the location changes
    if (location.state && location.state.category) {
      setCategory(location.state.category);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}&query=${encodeURIComponent(category)}&orientation=portrait`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.results);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const updateCategory = (newCategory:any) => {
    setCategory(newCategory);
  };

  return (
    <ProductContext.Provider value={{ products, category, updateCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };
