import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './component/HomePage';
import Inventory from './component/Inventory';
import Details from './component/Details';
import Layout from './component/Layout';
import Wishlist from './component/Wishlist';

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/details/:category/:productId" element={<Details />} />
          <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
