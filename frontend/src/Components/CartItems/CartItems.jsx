import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";

import remove_icon from "../Assets/cart_cross_icon.png";
import GlobalLoader from "../Loader/Loader";

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_products,
    cartItems,
    removeFromCart,
    loading,
  } = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {loading ? (
        <GlobalLoader />
      ) : (
        all_products.map((e, i) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    src={e.image}
                    alt=""
                    className="carticon-product-icon"
                    id={e.id}
                  />
                  <p>{e.name}</p>
                  <p> ${e.new_price} </p>
                  <button className="cartitems-quantity">
                    {cartItems[e.id]}
                  </button>
                  <p> ${e.new_price * cartItems[e.id]}</p>
                  <img
                    src={remove_icon}
                    className="cartitems-remove-icon"
                    alt=""
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total </h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECK OUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode, Enter it here </p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
