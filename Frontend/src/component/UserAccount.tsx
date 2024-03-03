import { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { backendUrl } from '../utils/config';
function UserAccount() {
  const { isLoggedIn, logout} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Here, you can perform any additional actions when the component mounts
    // For example, fetching user data or performing additional checks
    
    setIsLoading(false); // For demonstration, let's assume no additional actions are needed
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data or performing checks
  }
  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the server
      await axios.post(`${backendUrl}/auth/logout`,{},{
        withCredentials:true
      });

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
      {isLoggedIn ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          {/* Render the orders component here */}
        {/* <Link to="/" >  */}
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
{/* </Link> */}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          <p className="mb-4">Please sign in to view your orders.</p>
         <Link to="/login" ><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
            Login
          </button></Link>
        </div>
      )}
    </div>
  );
}

export default UserAccount;
