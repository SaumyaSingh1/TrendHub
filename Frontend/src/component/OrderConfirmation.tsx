import React, { useState, useEffect } from 'react';
import { backendUrl } from '../utils/config';
import axios from 'axios';

function OrderConfirmation() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/checkout`, {
          withCredentials: true
        });
        const { productDetails } = response.data;
        setProducts(productDetails.rows);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);
// Function to handle adding a product to the selected products state
const handleAddToCart = (product) => {
  setSelectedProducts([...selectedProducts, product]);
};
  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        {products.map(product => (
          <div key={product.product_id}>
            <h3>{product.product_name}</h3>
            <img src={product.product_image} alt={product.product_name} />
            <p>Cost: {product.product_cost}</p>
            <p>Size: {product.product_size}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderConfirmation;
