// ApiDataContext.tsx
import { createContext, useState, useEffect } from 'react';

const ApiDataContext = createContext<any>(null);

const ApiDataProvider: React.FC = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch API data based on category
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}&query=${encodeURIComponent(category)}&orientation=portrait`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (category) {
      fetchImages();
    }
  }, [category]);

  return (
    <ApiDataContext.Provider value={{ apiData, category, setCategory }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export { ApiDataContext, ApiDataProvider };
