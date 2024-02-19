import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Retrieve liked product IDs from local storage
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');

    // Fetch details of each liked product
    const fetchWishlist = async () => {
      const promises = likedProducts.map(async (productId) => {
        try {
          const response = await fetch(`https://api.unsplash.com/photos/${productId}?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${productId}`);
          }
          const product = await response.json();
          return product;
        } catch (error) {
          console.error('Error fetching product:', error);
          return null;
        }
      });
      const wishlistProducts = await Promise.all(promises);
      setWishlist(wishlistProducts.filter((product) => product !== null));
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Wishlist Page</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <Link to={`/details/${product.id}`}>
                <img src={product.urls.regular} alt={`Product ${index}`} className="w-full h-64 object-cover rounded-t-lg" />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.alt_description}</h3>
                <h4>Cost: Rs{product.likes}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in your wishlist</p>
      )}
    </div>
  );}
