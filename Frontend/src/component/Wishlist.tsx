import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { backendUrl } from '../utils/config';
import axios from 'axios';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Make an HTTP GET request to fetch the wishlist products
        const response = await axios.get(`${backendUrl}/api/wishlists`, {
          withCredentials: true
        });

        // Extract products and userId from the response
        const { products, userId } = response.data;
        console.log('Fetched products:', products, userId);
        // Update state with fetched products and userId
        setProducts(products);
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <p className="mb-4">User ID: {userId}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <div key={product.product_id} className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* Link to the product details page */}
              <Link to={`/details/${product.image_id}`}>
                <img src={product.product_image} alt={product.product_name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2">{product.product_name}</p>
                  <p className="text-gray-600">Cost:<b> Rs.{product.product_cost}</b></p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
