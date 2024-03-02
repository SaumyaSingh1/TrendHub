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
      const productData = response.data.product.rows[0]; // Access the nested product object
      setProduct(productData); // Update the product state variable
      console.log("productData", productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      <h2>Order Confirmation</h2>
      {product && (
        <div>
          <h3>{product.product_name}</h3>
          <img src={product.product_image} alt={product.product_name} />
          <p>Cost: Rs.{product.product_cost}</p>
          <p>Size: {product.product_size}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
