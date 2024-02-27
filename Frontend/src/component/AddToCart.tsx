import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../utils/config';
import axios from 'axios';

const AddToCart = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/carts`, {
          withCredentials: true
        });

        const { products, userId } = response.data;
        setProducts(products);
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.product_id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <Link to={`/details/${product.image_id}`}>
              <img src={product.product_image} alt={product.product_name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <Link to={`/details/${product.image_id}`} className="text-lg font-semibold mb-2">{product.product_name}</Link>
              <p className="text-gray-600">Cost: Rs.{product.product_cost}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Buy Now
                </button>
                <span className="text-gray-600">Size: {product.product_size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCart;
