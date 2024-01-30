import Login from "./component/Login.tsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import HomePage from "./component/HomePage.tsx";
import Inventory from "./component/Inventory.tsx";
import Layout from "./component/Layout.tsx";
import Product from "./component/Product.tsx";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "inventory",
          element: <Inventory />,
          },
             {
              path: "/product/:productId",
              element: <Product />,
            },
          
        
           
      ],
    },
  ]);
  return (
  
       <RouterProvider router={routes} /> 
    
  );
}

export default App;
