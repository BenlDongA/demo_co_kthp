import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import New from './components/new';
import HeadlineCards from './components/HeadlineCards';
import Food from './components/food/Food';
import './index.css';
import { CartProvider } from './components/cart/CartContext';
import CartPage from './components/cart/cart';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footerr from './components/footer';
import Banner from './components/banner/banner';
function App() {
  const location = useLocation();

  useEffect(() => {

    let pageTitle = "Trang Chủ |DBCO Restaurant"; 

    if (location.pathname === "/cart") {
      pageTitle = "Cart |DBCO Restaurant";
    }
    document.title = pageTitle;
  }, [location.pathname]);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<div>
          <Navbar />
          <div className='zz'>
          <Banner/>
            <HeadlineCards />
            <Food />
          </div>
          <Footerr />
        </div>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
