// Navbar.js
import React, { useState } from 'react';
import {  AiOutlineSearch } from 'react-icons/ai';
import { MdTableBar } from "react-icons/md";
import { BsFillCartFill, } from 'react-icons/bs';
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import './navbar.css';
import { useAuth } from '../Login/AuthProvider';

const Navbar = () => {
  const { isLoggedIn, logout, username, name } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      window.alert("Hãy nhập tên món ăn");
    } else {
      setErrorMessage('');
      navigate(`/search-results?query=${searchQuery}`);
    }
  };
  const handleLogout = () => {
 
    // Use the logout function from the useAuth hook
    logout();
    // Redirect to the home page or another appropriate location
    navigate('/');
  };
  

  return (
    <>
      <div className='container'>
        <div className='flex items-center'>
         
          <h1 className='lo'>DBCO Restaurant</h1>
          <div onClick={() => navigate('/')} className='Home'>
            HOME
          </div>
          <div onClick={() => navigate('/food')} className='Home'>
            MENU
          </div>
          <div onClick={() => navigate('/feedback')} className='Home'>
            Feedback
          </div>
        </div>

        {/* Search Input */}
        <div className='search'>
          <input
            className='bg-transparent p-2 w-full text-white focus:outline-none'
            type='text'
            placeholder='Tìm kiếm theo tên'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <AiOutlineSearch size={30} className='search-icon text-white' onClick={handleSearchClick} />
        </div>

        {/* Cart and Auth buttons */}
        <Link to="/booktable">
          <button>
            <MdTableBar size={20} className="button-cart" />
            Book a table
          </button>
        </Link>
        <Link to="/cart">
          <button>
            <BsFillCartFill size={20} className="button-cart" />
            Cart
          </button>
        </Link>
        {isLoggedIn ? (
          <div className="user-info" onClick={() => setShowLogout(!showLogout)}>
            <MdAccountCircle size={35}/> 
            {showLogout && (
          <div className="logout-box">
          <img className="img-acc" src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="User Avatar" />
          <div>
            <span>@.{username}</span>
            <div className='name'>Tên: {name}</div>
        
          <div id="iconlogout" onClick={handleLogout}>
            <IoMdLogOut size={20} />Đăng xuất
          </div>
          </div>
        </div>
        
            )}
          </div>
        ) : (
          <Link to="/login">
             <button>
            <MdLogin size={20} className="button-cart" />
            Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
