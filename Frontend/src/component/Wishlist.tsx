import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../utils/config';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch the wishlist data containing product IDs
        const response = await axios.get(`${backendUrl}/api/wishlist`);
        if (response.status === 200) {
          const wishlistData = response.data;
          const productIds = wishlistData.map(item => item.productId); // Extract product IDs
          
          // Fetch the corresponding products using the extracted product IDs
          const productsResponse = await axios.get(`${backendUrl}/api/product`, productIds);
          if (productsResponse.status === 200) {
            // Update wishlist state with the fetched products
            setWishlist(productsResponse.data);
          }
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
  
    fetchWishlist();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Wishlist Page</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {wishlist.map((product) => (
  <div key={product.id} className="bg-white rounded-lg shadow-md">
    <Link to={`/details/${product.id}`}>
      <img src={product.urls.regular} alt={`Product ${product.id}`} className="w-full h-64 object-cover rounded-t-lg" />
    </Link>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.alt_description}</h3>
      <h4>Cost: Rs {product.likes}</h4>
    </div>
  </div>
))}

        </div>
      ) : (
        <p>No items in your wishlist</p>
      )}
    </div>
  );
}
