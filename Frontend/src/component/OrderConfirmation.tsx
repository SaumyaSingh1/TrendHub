import  { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../utils/config';

interface Product {
  product_id: number;
  product_name: string;
  product_image: string;
  product_cost: number;
  product_size: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const imageId = new URLSearchParams(location.search).get("imageId");

  const [product, setProduct] = useState<Product | null>(null); // Specify the type of product

  useEffect(() => {
    const fetchProductDetails = async (imageId: string | null) => { // Specify the type of imageId
      try {
        if (imageId) {
          const response = await axios.get(`${backendUrl}/api/product/${imageId}`, {
            withCredentials: true
          });
  
          console.log("Response data:", response.data);
  
          const productData = response.data.product;
          if (productData && productData.rows && productData.rows.length > 0) {
            const productDetails: Product = productData.rows[0]; // Specify the type of productDetails
            setProduct(productDetails);
            console.log("Product details:", productDetails);
          } else {
            console.error('Invalid product data received:', productData);
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(imageId);
  }, [imageId]);

  const handlePayNowClick = async (productId: number) => {
    try {
      // Initiate the payment process by sending a request to the backend
      const response = await axios.post(`${backendUrl}/api/payment`, {
        productId: productId,
      }, {
        withCredentials: true, // Ensure credentials are sent along with the request
      });
      
      // Check if the request was successful
      if (response.status === 200) {
        console.log('Payment process initiated successfully');
        // Add logic to handle the response, such as redirecting the user to the payment gateway
      } else {
        // Handle error if the payment process couldn't be initiated
        console.error('Failed to initiate payment process');
      }
    } catch (error) {
      // Handle any errors that occur during the payment process
      console.error('Error initiating payment process:', error);
    }
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

            <Link to='/payment'><button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handlePayNowClick(product.product_id)}>
              Pay Now
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
