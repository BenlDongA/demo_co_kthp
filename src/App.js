import React, { useEffect } from 'react';
import './index.css';
import Navbar from './components/navbar/Navbar';
import BookTable from './components/booktable';
import HeadlineCards from './components/HeadlineCards';
import Food from './components/food/Food';
import { CartProvider } from './components/cart/CartContext';
import CartPage from './components/cart/cart';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footerr from './components/footer';
import Banner from './components/banner/banner';
import SearchResultsPage from './components/food/SearchResultsPage'
import BestSale from './components/best-sale/best_sale';
import BestSalez from './components/best-sale/contact'
import Feedback from './components/feedback/feedback';
import Login from './components/Login/Login'
import Register from './components/Register/Register';

function App() {
  const location = useLocation();

  useEffect(() => {

    let pageTitle = "Trang Chủ |DBCO Restaurant"; 

    if (location.pathname === "/cart") {
      pageTitle = "Cart |DBCO Restaurant";
    }
    if (location.pathname === "/food") {
      pageTitle = "Menu |DBCO Restaurant";
    }
    if (location.pathname === "/feedback") {
      pageTitle = "FeedBack |DBCO Restaurant";
    }
    if (location.pathname === "/booktable") {
      pageTitle = "Đặt Bàn |DBCO Restaurant";
    }
    if (location.pathname === "/login") {
        pageTitle = "Đăng nhập |DBCO Restaurant";
      }
      if (location.pathname === "/register") {
        pageTitle = "Đăng kí |DBCO Restaurant";
      }

    document.title = pageTitle;
  }, [location.pathname]);

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>
            <div className='zz'>
              <Banner />
              <HeadlineCards />
              <BestSalez/>
             <BestSale/>
            </div>
            <Footerr />
          </div>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/food" element={<Food />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
     
          
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
