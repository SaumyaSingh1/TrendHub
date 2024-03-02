import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { backendUrl } from '../utils/config';
import axios from 'axios';

const OrderConfirmation = () => {
  const location = useLocation();
  const imageId = new URLSearchParams(location.search).get("imageId");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (imageId) {
      fetchProductDetails(imageId);
    }
  }, [imageId]);
  const fetchProductDetails = async (imageId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/${imageId}`, {
        withCredentials: true
      });
  
      console.log("Response data:", response.data);
  
      const productData = response.data.product;
      if (productData && productData.rows && productData.rows.length > 0) {
        const productDetails = productData.rows[0]; // Accessing the first element of the rows array
        setProduct(productDetails);
        console.log("Product details:", productDetails);
      } else {
        console.error('Invalid product data received:', productData);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  const handlePayNowClick = () => {
    // Add logic to handle payment process
    console.log('Payment process initiated');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      {product && (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
            <img src={product.product_image} alt={product.product_name} className="w-full h-48 object-cover mb-4" />
            <p className="text-gray-600 mb-2">Cost: Rs.{product.product_cost}</p>
            <p className="text-gray-600 mb-4">Size: {product.product_size}</p>
            {/* Add more details as needed */}

            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handlePayNowClick}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
