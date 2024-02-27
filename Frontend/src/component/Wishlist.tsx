import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>Wishlist</h2>
      <p>User ID: {userId}</p>
      <ul>
        {products&&products.map((product) => (
          <li key={product.product_id}>
            {/* Display product information */}
            <div>
              <img src={product.product_image} alt={product.product_name} />
              <p>{product.product_name}</p>
              <p>{product.product_cost}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;


