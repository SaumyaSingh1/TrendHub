import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../utils/config';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make API call to authenticate user
      const response = await axios.post(backendUrl + "/auth/login", { email, password });

      if (response.status === 200) {
        // Login successful, navigate to home page
        const { userId, accessToken, refreshToken } = response.data;

        // Store tokens and user ID in browser cookies
        document.cookie = `accessToken=${accessToken}; secure; samesite=strict`;
        document.cookie = `refreshToken=${refreshToken}; secure; samesite=strict`;
        document.cookie = `user_id=${userId}; secure; samesite=strict`;
      navigate('/')
        console.log('userId:', userId, 'user refresh_token:', refreshToken);
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-customColor hover:bg-customColor-hover text-white font-bold py-2 px-4 rounded-full">Login</button>
        </div>
      </form>
      <div className="text-center">
        <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
