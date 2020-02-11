import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import logoutUser from "../strapi/logoutUser";
export default function LoginLink() {
  const { user, userLogout } = React.useContext(UserContext);
  const { clearCart } = React.useContext(CartContext);
  if (user.token) {
    return (
      <button
        className="login-btn"
        onClick={() => {
          logoutUser(user);
          userLogout();
          clearCart();
        }}
      >
        logout
      </button>
    );
  }
  return <Link to="/login">login</Link>;
}
