import React, { useContext, useRef } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import nav_logo from "../Assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import nav_dropdown_icon from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={nav_logo} alt="nav-logo" />
          <p className="nav-name">SHOPPING</p>
        </div>
      </Link>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown_icon}
        alt="dropdown-icon"
      />
      <ul ref={menuRef} className="nav-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          SHOP
        </NavLink>
        <NavLink
          to="/mens"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          MEN
        </NavLink>
        <NavLink
          to="/womens"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          WOMEN
        </NavLink>
        <NavLink
          to="/kids"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          KIDS
        </NavLink>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="cart-icon" />
        </Link>
        <div className="nav-bar-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
