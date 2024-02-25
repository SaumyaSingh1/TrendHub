import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import './Inventory.css';
function Inventory() {
  const { products, category } = useContext(ProductContext);
   console.log(products);
  return (
    <div className="inventory-container">
      <h2 className="inventory-heading">Inventory Page - {category}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <Link to={`/details/${category}/${product.id}`}>
              <img
                src={product.urls.regular}
                className="product-image"
                alt={`Product ${product.id}`}
              />
            </Link>
            <div className="product-details">
              <h6 className="product-title">{product.alt_description}</h6>
              <p className="product-cost">
                <b>Cost: Rs. </b>
                {product.likes} {/* Assuming product.cost represents the cost */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
