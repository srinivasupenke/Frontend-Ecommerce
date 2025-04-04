import React, { useState, createContext, useEffect } from "react";
import all_products from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
  return savedCart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:4000";

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setLoading(true);
      fetch(`${url}/getcart`, {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart:", error))
        .finally(() => setLoading(false));
    }
  }, []);

  const updateLocalCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (itemId) => {
    let updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    updateLocalCart(updatedCart);

    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/addtocart`, {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    if (!cartItems[itemId]) return;

    let updatedCart = {
      ...cartItems,
      [itemId]: Math.max(0, cartItems[itemId] - 1),
    };
    updateLocalCart(updatedCart);

    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/removefromcart`, {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, item) => {
      let product = all_products.find((product) => product.id === Number(item));
      return total + (product ? product.new_price * cartItems[item] : 0);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const ContextValue = {
    all_products,
    getTotalCartItems,
    getTotalCartAmount,
    cartItems,
    addToCart,
    removeFromCart,
    loading,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
