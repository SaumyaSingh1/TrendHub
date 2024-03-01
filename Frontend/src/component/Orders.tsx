    // const handlePayButton=async()=>{
    //     const response = await axios.post(`${backendUrl}/payment`{
    //         withCredentials:true,
    //     })
    // }
    //as prop product image and name cost 
    //total cost 
    //pay now button 
    //payment done 
    //orders me post kro user id prod id 
    //order status change
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const Orders = () => {
  const [product, setProduct] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const location = useLocation(); // Access product data from previous page
  const { product: passedProduct } = location.state || {};

  useEffect(() => {
    // Prioritize product data passed through state
    if (passedProduct) {
      setProduct(passedProduct);
      setTotalPrice(passedProduct.product_cost); // Calculate total price
    } else {
      // Fallback to local storage if product data is not passed
      const cartDataString = localStorage.getItem('cart');
      const productDetails = cartDataString ? JSON.parse(cartDataString) : null;
      
      if (productDetails) {
        setProduct(productDetails);
        setTotalPrice(productDetails.product_cost); // Calculate total price
      }
    }
  }, [passedProduct]);

  return (
    <div>
      <h2>Order Summary</h2>
      {product && product.product_name ? (
        <div>
          <h3>{product.product_name}</h3>
          <img src={product.product_image} alt={product.product_name} />
          <p>Cost: Rs.{product.product_cost}</p>
          <p>Size: {product.product_size}</p>
        </div>
      ) : (
        <p>No product found</p>
      )}
      <div>
        <h4>Total Price: Rs.{totalPrice}</h4>
        <button>Pay Now</button> {/* Handle payment logic here */}
      </div>
    </div>
  );
};

export default Orders;
