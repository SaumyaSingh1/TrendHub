import  { createContext, useContext, useState ,useEffect,ReactNode} from 'react';
import Cookies from 'js-cookie'
// interface Product {
//   product_id: number;
//   product_image: string;
//   product_name: string;
//   product_cost: number;
//   product_size: string;
// }
interface AuthProviderProps {
  children: ReactNode; // This defines the type of the 'children' prop
}

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logout: () => {}
});;

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for refresh token in cookies
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      // User is logged in if refresh token is present
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    // Remove refresh token from cookies
    Cookies.remove('refreshToken');
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn,logout }}>
      {children}
    </AuthContext.Provider>
  );
}
