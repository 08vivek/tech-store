// cart context
import React from "react";

const CartContext = React.createContext();

function getCartFromLocalStorage() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
}

function CartProvider({ children }) {
  const [cart, setCart] = React.useState(getCartFromLocalStorage);
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    // local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    
    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);

  }, [cart]);

  // remove item
  const removeItem = id => {
    setCart([...cart].filter(item => { return item.id !== id }));
  };
  // increase amount
  const increaseAmount = id => {
    setCart([...cart].map(item => {return (item.id === id ? {...item ,amount: item.amount+1} : {...item} )}));
  };
  // decrease amount
  const decreaseAmount = (id, amount) => {
      if(amount === 1){
          removeItem(id);
          return;
      }
      else{
        setCart([...cart].map(item => {return (item.id === id ? {...item ,amount: item.amount-1} : {...item} )}));
      }
  };
  // add to cart
  const addToCart = product => {
    const {id,image,title,price} = product;
    const itempresentalready = [...cart].find(item => item.id === id);
    if(itempresentalready){
        increaseAmount(id);
        return;
    }
    else{
        const newitem = {id,image,title,price,amount: 1};
        const newcart = [...cart,newitem];
        setCart(newcart);
    }
  };
  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart,total,cartItems,increaseAmount,decreaseAmount,addToCart,clearCart,removeItem}}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
