import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
 
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const clickedProduct = await response.json();
        setProduct(clickedProduct);
      } 
      catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    getProduct();
  }, [id]);

  return (
    <>
      <div>
        {product.urls && 
          <img 
            src={product.urls.regular} 
            alt={product.alt_description}    
            style={{ 
              maxWidth: '30vw', 
              height: 'auto',
              float: 'left', // Align the image to the left
              marginRight: '20px',
            }}
            className='my-10'
          />
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <h1 style={{ fontFamily: 'Arial', color: '#331a00', fontSize: '40px', marginTop: '30px' }}>
    <b>
      {product.tags && product.tags[2].title} {product.tags && product.tags[1].title}
    </b>
  </h1>
  <hr style={{ color: 'black', width: '100%', marginTop: '10px', marginBottom: '10px' }} />
  
  <h3 style={{ color: '#9494b8' }}>{product.description && product.description}</h3>
  <h3 style={{ color: '#9494b8' }}>{product.alt_description}</h3>
  <h5 style={{ color: '#331a00' }}>
    <b>Cost: Rs {product.likes}</b>
  </h5>
  <h5 style={{marginTop:'20px'}}>Select Size</h5>
  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 via-red-400 to-red-600 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-black dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
One Size
</span>

</button>
</div>
  <button type="button" className="text-gray-900 my-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add to Cart</button>
  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-black dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Wishlist
    </span>
  </button>



    </>
  );
}

export default Details;
