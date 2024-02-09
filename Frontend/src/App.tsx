import Login from "./component/Login.tsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";
import HomePage from "./component/HomePage.tsx";
import Inventory from "./component/Inventory.tsx";
import Layout from "./component/Layout.tsx";
import Details from "./component/Details.tsx";
import Wishlist from "./component/Wishlist.tsx";
import { ApiDataProvider } from "./context/ApiContext.tsx";
function App() {
  return (
  <Router>
    <Routes>
      <Route
       path="/" 
       element={<Layout/>} >
       <Route path='/' element={<HomePage/>}></Route>
       <Route path='login' element={<Login/>}></Route>
       <Route path='inventory' element={<ApiDataProvider><Inventory/></ApiDataProvider>}></Route>
       <Route path='details/:id' element={<Details/>}></Route>
       {/* <Route path='wishlist' element={<ApiProvider><Wishlist/> </ApiProvider>}></Route> */}
      </Route>
    </Routes>
  </Router>
    
  );
}

export default App;
