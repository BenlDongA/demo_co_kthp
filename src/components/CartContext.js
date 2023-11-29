// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        const existingItem = updatedCart[existingItemIndex];

        const newQuantity = existingItem.quantity + 1;
        const newPrice =
          isNaN(Number(action.payload.price))
            ? existingItem.price
            : existingItem.price + Number(action.payload.price);

        updatedCart[existingItemIndex] = { ...existingItem, quantity: newQuantity, price: newPrice };

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const newCartItem = {
          ...action.payload,
          quantity: 1,
          price: isNaN(Number(action.payload.price)) ? 0 : Number(action.payload.price),
        };

        return {
          ...state,
          cart: [...state.cart, newCartItem],
        };
      }

    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.price + item.price / item.quantity, // adjust the price based on the new quantity
              }
            : item
        ),
      };

    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: item.price - item.price / item.quantity,
              }
            : item
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'TOGGLE_CHECKED_ITEM':
      const toggledItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (toggledItemIndex !== -1) {
        const updatedCart = [...state.cart];
        const toggledItem = updatedCart[toggledItemIndex];
        updatedCart[toggledItemIndex] = { ...toggledItem, checked: !toggledItem.checked };

        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state;

    case 'CALCULATE_CHECKED_TOTALS':
      const checkedItems = state.cart.filter(item => item.checked);
      const totalCheckedQuantity = checkedItems.reduce((total, item) => total + item.quantity, 0);
      const totalCheckedPrice = checkedItems.reduce((total, item) => total + item.price, 0);

      return {
        ...state,
        totalQuantity: totalCheckedQuantity,
        totalPrice: totalCheckedPrice,
      };
      case 'TOGGLE_ALL_ITEMS':
        const allItemsChecked = action.payload;
        const updatedCart = state.cart.map(item => ({ ...item, checked: allItemsChecked }));
  
        return {
          ...state,
          cart: updatedCart,
          totalQuantity: allItemsChecked ? state.totalQuantity : 0,
          totalPrice: allItemsChecked ? state.totalPrice : 0,
        };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const incrementQuantity = (item) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: item });
  };

  const decrementQuantity = (item) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const toggleCheckedItem = (item) => {
    dispatch({ type: 'TOGGLE_CHECKED_ITEM', payload: item });
    dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
  };
  const toggleAllItems = (isChecked) => {
    dispatch({ type: 'TOGGLE_ALL_ITEMS', payload: isChecked });
    if (isChecked) {
      dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
    } else {
      dispatch({ type: 'CALCULATE_TOTALS' });
    }
  };
  useEffect(() => {
    dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
  }, [state.cart, state.cart.map(item => item.checked)]);

  return (
    <CartContext.Provider value={{ cart: state.cart, 
      totalQuantity: state.totalQuantity,
       totalPrice: state.totalPrice, 
       addToCart, 
       incrementQuantity, 
       decrementQuantity,
        removeFromCart, 
        toggleCheckedItem,
        toggleAllItems }}>
        {children}
      </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
