import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../utils/config';

function UserAccount() {
  const { isLoggedIn, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Here, you can perform any additional actions when the component mounts
    // For example, fetching user data or performing additional checks
    setIsLoading(false); // For demonstration, let's assume no additional actions are needed
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the server
      await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });

      // Once the server successfully logs out the user, trigger the client-side logout
      logout();
      console.log("logout successfully")
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout error (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div>Loading...</div> // Show loading indicator while fetching data or performing checks
      ) : isLoggedIn ? (
        <div>
          <Link to='/orders'>
            <button className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 mb-4">
              <span className="material-icons text-xl">arrow_right</span>
              <span className="text-lg">Your Orders</span>
            </button>
          </Link>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2" onClick={handleLogout}>
            <span className="material-icons text-xl">logout</span>
            <span className="text-lg">Logout</span>
          </button>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="mb-4">Please sign in to view your orders.</p>
            <Link to="/login">
              <button className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
                <span className="material-icons text-xl">login</span>
                <span className="text-lg">Login</span>
              </button>
            </Link>
          </div>
          <div>
            <p>OR</p>
            <Link to="/signup">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 mt-4">
                <span className="material-icons text-xl">person_add</span>
                <span className="text-lg">Signup</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccount;
