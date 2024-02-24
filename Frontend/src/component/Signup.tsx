import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {backendUrl} from '../utils/config'
import axios from 'axios'
const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      address,
      contact
    };

    try {
      const response = await axios.post(backendUrl+'/auth/signup', userData);

      console.log('User signed up successfully');
      // Redirect or show success message
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Show error message to the user
    }
  };
  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address " className="block text-gray-700">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
           
          />
        </div>
        <div className="mb-4 flex justify-center">
          <button type="submit" className="bg-customColor hover:bg-customColor-hover
             text-white font-bold py-2 px-4 rounded-full">Sign Up</button>
        </div>
      </form>
      <div className="text-center">
        <p>Already have an account? <Link to="/login" className="text-pink-900 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;
