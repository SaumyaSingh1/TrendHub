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
import AddToCart from './component/AddToCart';
import UserAccount from './component/UserAccount';
import Orders from './component/Orders';
import OrderConfirmation from './component/OrderConfirmation';
import Payment from './component/Payment';
function App() {
  return (
    // Router component to enable routing
    <Router>
      {/* Provider component to provide product context to all components */}
      <ProductProvider>
        {/* Routes component to define various routes */}
        <Routes>
          {/* Layout component for common layout */}
          <Route path="/" element={<Layout/>}>
            {/* Route for login page */}
            <Route path="/login" element={<Login/>} />
            {/* Route for signup page */}
            <Route path="/signup" element={<SignupForm/>} />
            {/* Route for home page */}
            <Route path="/" element={<HomePage />} />
            {/* Route for inventory page */}
            <Route path="/inventory/*" element={<Inventory />} />
            {/* Route for product details page */}
            <Route path="/details/:productId" element={<Details />}/>
            {/* Route for wishlist page */}
            <Route path="/wishlist" element={<Wishlist />} />
            {/* Route for adding items to cart */}
            <Route path="/addtocart" element={<AddToCart />} />
            {/* Route for user account page */}
            <Route path="/userAccount" element={<UserAccount />} />
            {/* Route for viewing orders */}
            <Route path="/orders" element={<Orders />} />
            {/* Route for order confirmation page */}
            <Route path="/OrderConfirmation" element={<OrderConfirmation/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Route>
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
