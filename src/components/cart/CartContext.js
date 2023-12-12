// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotalQuantity = (cart) => {
  return cart.reduce((total, item) => total + (item.checked ? item.quantity : 0), 0);
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + (item.checked ? item.price : 0), 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('Current State:', state);
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
                price: item.price + item.price / item.quantity,
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
      const totalCheckedQuantity = calculateTotalQuantity(checkedItems);
      const totalCheckedPrice = calculateTotalPrice(checkedItems);

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
        totalQuantity: allItemsChecked ? calculateTotalQuantity(updatedCart) : 0,
        totalPrice: allItemsChecked ? calculateTotalPrice(updatedCart) : 0,
      };

    case 'RESET_CART':
      return {
        ...state,
        cart: action.payload,
        totalQuantity: calculateTotalQuantity(action.payload),
        totalPrice: calculateTotalPrice(action.payload),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'RESET_CART', payload: JSON.parse(storedCart) });
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
        addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
        incrementQuantity: (item) => dispatch({ type: 'INCREMENT_QUANTITY', payload: item }),
        decrementQuantity: (item) => dispatch({ type: 'DECREMENT_QUANTITY', payload: item }),
        removeFromCart: (item) => dispatch({ type: 'REMOVE_FROM_CART', payload: item }),
        toggleCheckedItem: (item) => {
          dispatch({ type: 'TOGGLE_CHECKED_ITEM', payload: item });
          dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
        },
        toggleAllItems: (isChecked) => {
          dispatch({ type: 'TOGGLE_ALL_ITEMS', payload: isChecked });
        },
        handlePayment: () => {
          const confirmMessage = `Bạn có chắc muốn thanh toán ${state.totalPrice}$ không?`;

          if (window.confirm(confirmMessage)) {
            const unpaidItems = state.cart.filter(item => !item.checked);
            dispatch({ type: 'RESET_CART', payload: unpaidItems });
            alert('Thanh toán thành công!');
          } else {
            alert('Thanh toán đã bị hủy bỏ.');
          }
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
