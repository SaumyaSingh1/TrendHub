import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../utils/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/carts`, {
          withCredentials: true
        });

        const { products, userId } = response.data;
        setProducts(products);
        setUserId(userId);

        // Calculate the total price when cart is fetched
        const total = products.reduce((acc, curr) => acc + curr.product_cost, 0);
        setTotalPrice(total);
        
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

 const handleBuyNowClick = async (productId:number) => {
  try {
    const response = await axios.post(`${backendUrl}/api/checkout`, { productId },{
      withCredentials:true
    });
  
        if (!response) {
            throw new Error('Failed to process order');
        }

        // Redirect to order confirmation page
      navigate('/OrderConfirmation');
      console.log("productId",productId)
    } catch (error:any) {
        console.error('Error processing order:', error.message);
        // Handle error: Display an error message to the user
    }}


  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <p className="mb-4">User ID: {userId}</p>
      <h1 className="mb-4"><b>Total Price: Rs.{totalPrice}</b></h1>
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
            
              <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleBuyNowClick(product.product_id)}>
                 Buy now
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
