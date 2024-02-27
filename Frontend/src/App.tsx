import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Login from './component/Login';
import HomePage from './component/HomePage';
import Inventory from './component/Inventory';
import Details from './component/Details';
import Layout from './component/Layout';
import Wishlist from './component/Wishlist';
import SignupForm from './component/Signup';

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory/*" element={<Inventory />} />
            <Route path="/details/:productId" element={<Details />}/>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
