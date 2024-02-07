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
      <div>
        <h1>{product.alt_description}</h1>
        <hr />
        {/* Access the generated cost from location.state */}
        <h2><b>Cost: Rs {product.likes}</b></h2>
      </div>
    </>
  );
}

export default Details;
