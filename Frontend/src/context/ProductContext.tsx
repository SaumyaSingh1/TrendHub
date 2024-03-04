import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Define the initial context value
const initialProductContextValue = {
  products: [],
  category: '',
  updateCategory: () => {}
};

interface ProductContextType {
  products: any[]; // Update this type with the actual type of products
  category: string;
  updateCategory: (newCategory: string) => void;
}

const ProductContext = createContext<ProductContextType>(initialProductContextValue);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]); // Update this type with the actual type of products
  const [category, setCategory] = useState<string>('');
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

  const updateCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <ProductContext.Provider value={{ products, category, updateCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };
