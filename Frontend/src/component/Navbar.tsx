import './Navbar.css';
import { CiUser } from 'react-icons/ci';
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
 import logo from '../assets/newnav.png';
import { Link } from 'react-router-dom';

export default function NavBar() {

  return (
    <>
      <div id="header" className="d-flex align-items-center justify-content-between">
        <Link to='/'>
          <img src={logo} height="60px" width="120px" alt="Logo" />
        </Link>

        <ul className="nav">
        <Link to='/'><li className="nav-link">HOME</li></Link>
        <Link to='inventory' state={{category:"women's wear"}}><li className="nav-link">WOMEN</li></Link>
          <Link to='inventory' state={{ category: "men's wear" }}><li className="nav-link">MEN</li></Link>
          <Link to='inventory' state={{category:"kid's wear"}}><li className="nav-link">KIDS</li></Link>
          <Link to='inventory' state={{category:"Beauty"}} ><li className="nav-link">BEAUTY</li></Link>
        </ul>

        <form className="search-form" role="search">
          <input
            type="search"
            className="form-control form-control-light text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div className="user-container">
         <Link to='userAccount'>
          <CiUser className="user" /></Link>

       <Link to='wishlist'>  
        <CiHeart className="user" />
        </Link>

         <Link to='addtocart'> 
         <GiShoppingCart className="user" />
         </Link>

        </div>
      </div>
    </>
  );
}
