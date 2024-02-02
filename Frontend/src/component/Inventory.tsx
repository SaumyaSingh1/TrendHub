import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function Inventory() {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}&query=${encodeURIComponent(location.state.category)}&orientation=portrait`
      );
      //encodeURI(js fxn) to encode data coming from location.state.category in strings avoiding any special char or spaces so api will understand the request properly
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  function generateCost() {
    const rand = Math.random() * 10000;
    const val = Math.round(rand);
    return val;
  }
  function extractProductName(description) {
    const desc = description.toLowerCase();
    const keywords = [
      "grey",
      "white shirt",
      "color folded shirt",
      "crew neck shirt",
      " white floral tank top",
    ];
    const foundKeyword = keywords.find((keyword) => desc.includes(keyword));
    return foundKeyword || desc;
  }
  useEffect(() => {
      if (location.state && location.state.category) {
    fetchImages();
  }
  }, [location.state]);
  
  console.log(products);
  return (
    <div className="grid grid-cols-4 p-3">
      {products.map((product, index) => (
        <>
         <div className="relative">
         <Link to={{
  pathname: `/product/${product.id}`,
  state: { product: product }
}} key={index}>
 <img
              key={index}
              src={product.urls.regular}
              className="p-4 m-4"
              style={{ width: "100%", height: "80%" }}
              alt={`Image ${index}`}
            /></Link>
            <div
              className="absolute bottom-0 left-0 text-black p-2"
              style={{ width: "90%", height: "90px" }}
            >
              <h6 className="mt-2 mb-1 font-bold">
                {extractProductName(product.alt_description)}
              </h6>
              <p className="text-xs">
                <b>Cost: Rs. </b>
                {generateCost()}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
export default Inventory;
