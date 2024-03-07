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
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/inventory/*" element={<Inventory />} />
              <Route path="/details/:productId" element={<Details />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/addtocart" element={<AddToCart />} />
              <Route path="/userAccount" element={<UserAccount />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orderconfirmation" element={<OrderConfirmation />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Layout>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
