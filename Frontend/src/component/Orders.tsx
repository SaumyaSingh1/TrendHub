import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils/config';

function Orders() {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/orders`,{
          withCredentials:true
        }); // Assuming you have an endpoint to fetch orders
        console.log('OrderedProducts', response.data); // Check the structure of response.data
        setOrderedProducts(response.data.products); // Assuming the products are under 'products' key
      } catch (error) {
        console.error('Error fetching orders:', error);
      } 
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Your Ordered Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orderedProducts && orderedProducts.map((product) => (
                <div key={product.product_id} className="border rounded overflow-hidden">
                    <img className="w-full h-48 object-cover" src={product.product_image} alt={product.product_name} />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                        <p className="text-gray-700 mb-2">Price: Rs.{product.product_cost}</p>
                        <p className="text-gray-700">Size: {product.product_size}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Orders;
