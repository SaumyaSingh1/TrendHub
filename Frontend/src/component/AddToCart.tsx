import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../utils/config';
import axios from 'axios';

// Define the interface for the Product type
interface Product {
  product_id: number;
  image_id: string;
  product_image: string;
  product_name: string;
  product_cost: number;
  product_size: string;
}

const AddToCart = () => {
  // State variables for products, userId, and total price
  const [products, setProducts] = useState<Product[]>([]); // Specify the type as Product[]
  const [userId, setUserId] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Fetching cart data from the backend
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/carts`, {
          withCredentials: true
        });

        const { products, userId } = response.data;
        // Setting fetched data to state variables
        setProducts(products);
        setUserId(userId);

        // Calculating total price of products in the cart
        const total = products.reduce((acc:number, curr:any) => acc + curr.product_cost, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  // Function to handle the Buy Now button click
  const handleBuyNowClick = async (imageId: string) => {
    try {
      const response = await axios.post(`${backendUrl}/api/checkout`, { imageId }, {
        withCredentials: true
      });

      if (!response) {
        throw new Error('Failed to process order');
      }
      // Redirecting to order confirmation page after successful checkout
      const orderConfirmationUrl = `http://localhost:5173/OrderConfirmation?imageId=${imageId}`;
      window.location.href = orderConfirmationUrl;

      console.log("imageId", imageId)
    } catch (error: any) {
      console.error('Error processing order:', error.message);
      // Handle error: Display an error message to the user
    }
  }

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
                <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleBuyNowClick(product.image_id)}>
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
