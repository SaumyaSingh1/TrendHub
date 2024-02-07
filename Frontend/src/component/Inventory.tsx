import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Inventory() {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${
          import.meta.env.VITE_UNSPLASH_CLIENT_ID
        }&query=${encodeURIComponent(
          location.state.category
        )}&orientation=portrait`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  const category  =  location.state && location.state.category;

  console.log(category);

  useEffect(() => {
    if (location.state && location.state.category) {
      fetchImages();
    }
  }, [location.state]);

  console.log(products);

  return (
    <div className="grid grid-cols-4 p-3">
      {products.map((product, index) => (
        <div className="relative" key={index}>
          <Link
            to={{
              pathname: `/details/${product.id}`,
              state: { cost: product.likes || 0}
            }}
          >
            <img
              src={product.urls.regular}
              className="p-4 m-4"
              style={{ width: "100%", height: "80%" }}
              alt={`Image ${index}`}
            />
         
          <div className="absolute bottom-0 left-0 text-black p-2" style={{ width: "90%", height: "90px" }}>
            <h6 className="mt-2 mb-1 font-bold">{product.tags && product.tags[2].title}</h6>
            <p className="text-xs"><b>Cost: Rs. </b>{product.likes}</p>
          </div> </Link>
        </div>
      ))}
    </div>
  );
}

export default Inventory;
