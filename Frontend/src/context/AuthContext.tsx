import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: (userData: { userId: string; accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  accessToken: string; // Add accessToken property
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  accessToken: '' // Default empty string for accessToken
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string>(''); // State to manage accessToken

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    const savedAccessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookies
    if (refreshToken && savedAccessToken) {
      setIsLoggedIn(true);
      setAccessToken(savedAccessToken); // Set accessToken from cookies
    }
  }, []);

  const login = (userData: { userId: string; accessToken: string; refreshToken: string }) => {
    setIsLoggedIn(true);
    setAccessToken(userData.accessToken); // Set accessToken
    Cookies.set('refreshToken', userData.refreshToken, { secure: true, sameSite: 'strict' });
    // You can store the access token and user ID in the state if needed
  }

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(''); // Clear accessToken
    Cookies.remove('refreshToken');
    // Additional cleanup if needed
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
