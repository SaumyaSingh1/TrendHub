import './Navbar.css';
import { CiUser } from 'react-icons/ci';
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <div id="header" className="d-flex align-items-center justify-content-between">
        <Link to='/'>
          <img src={logo} height="60px" width="120px" alt="Logo" />
        </Link>

        <ul className="nav">
          <li className="nav-link">HOME</li>
          <li className="nav-link">WOMEN</li>
          <li className="nav-link">MEN</li>
          <li className="nav-link">KIDS</li>
          <li className="nav-link">BEAUTY</li>
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
          <CiUser className="user" />
          <CiHeart className="user" />
          <GiShoppingCart className="user" />
        </div>
      </div>
    </>
  );
}
