import React, { useContext, useRef } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import nav_logo from "../Assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import nav_dropdown_icon from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();
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
        <li
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => {}}
        >
          <Link to="/">Shop</Link> {location.pathname === "/" ? <hr /> : <></>}
        </li>
        <li
          className={location.pathname === "/mens" ? "active" : ""}
          onClick={() => {}}
        >
          <Link to="/mens">Men</Link> {location.pathname === "/mens" && <hr />}
        </li>
        <li
          className={location.pathname === "/womens" ? "active" : ""}
          onClick={() => {}}
        >
          <Link to="/womens">Women</Link>{" "}
          {location.pathname === "/womens" && <hr />}
        </li>
        <li
          className={location.pathname === "/kids" ? "active" : ""}
          onClick={() => {}}
        >
          <Link to="/kids">Kids </Link>{" "}
          {location.pathname === "/kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>login</button>
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
