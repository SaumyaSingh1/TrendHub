import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../utils/config';
function Details() {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${productId}?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const clickedProduct = await response.json();
        setProduct(clickedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    
    fetchProduct();
  }, [productId]);

  const handleAddToWishlist = async () => {
    try {
      const existingLikedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
  
      if (!existingLikedProducts.includes(productId)) {
        const updatedLikedProducts = [...existingLikedProducts, productId];
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
        setLike(true);
  
        const response = await fetch(`${backendUrl}/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            productName: product.alt_description, // Assuming product.name is the product name
             productCost:product.likes,
             productImage:product.urls.regular,
            //  productType:category,
             productSize:"One Size",
          }),
        });
      
        if (!response.ok) {
          throw new Error(`Failed to add product to wishlist: ${response.statusText}`);
        }
  
        console.log('Product added to wishlist successfully');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {product && (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={product.urls.regular} alt={product.alt_description} className="w-full rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
           
            <h2 className="text-3xl font-bold mb-4">{product.tags[2].title} {product.tags[1].title} {product.tags[0].title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p> 
            <h2>Cost:Rs.<b>{product.likes}</b></h2>
            <br/>
            <h5>Select Size:</h5>
            <button 
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black`}
            >
             One Size
            </button>
            <br/>
            <br/>
            <button 
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white mr-4 ${like ? 'bg-red-600 hover:bg-rose-500' : 'bg-rose-600 hover:bg-rose-700 '}`}
              onClick={handleAddToWishlist}
            >
              <span className="mr-2">{like ? '❤️' : '🤍'}</span> {like ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
            <button 
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-900`}
            >
              <span >Add to cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
