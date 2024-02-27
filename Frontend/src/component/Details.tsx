import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { backendUrl } from '../utils/config';

function Details() {
 let {  productId } = useParams();
  const {  products } = useContext(ProductContext);
  const product = products.find(product => product.id === productId);
  const [like, setLike] = useState(false);
  console.log('productId:', productId);
  const productIdNumericPart = productId.replace(/\D/g, '');
  // Convert to integer
  const productIdInt = parseInt(productIdNumericPart, 10);
console.log(productIdInt);

  const handleAddToWishlist = async () => {
    try {
      if (product) {
        setLike(true);
        //saving product data to backend when wishlist button clicked
        const response = await fetch(`${backendUrl}/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials:'include',
          body: JSON.stringify({
            productID: productIdInt,
            imageId:productId,
            productName: product.alt_description,
            productCost: product.likes,
            productImage: product.urls.regular,
            productSize: "One Size",
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to add product to products table: ${response.statusText}`);
        }
         console.log('product added to product table')
        // Add the product to the wishlist table in the backend
        const wishlistResponse = await fetch(`${backendUrl}/api/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
          productId:productIdInt

          }),
        });

        if (!wishlistResponse.ok) {
          throw new Error(`Failed to add product to wishlist: ${wishlistResponse.statusText}`);
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
