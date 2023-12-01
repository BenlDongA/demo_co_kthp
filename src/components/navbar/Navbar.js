import React, { useState } from 'react';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { MdTableBar } from "react-icons/md";
import { BsFillCartFill, BsFillSaveFill } from 'react-icons/bs';
import { FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import './navbar.css';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      window.alert("Hãy nhập tên món ăn")
    } else {
      setErrorMessage('');
      navigate(`/search-results?query=${searchQuery}`);
    }
  };



  return (
    <>
      <div className='container'>
        <div className='flex items-center'>
          <div onClick={() => setNav(!nav)} className=''>
            <AiOutlineMenu size={30} />
          </div>
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
            className='bg-transparent p-2 w-full  text-white focus:outline-none'
            type='text'
            placeholder='Tìm kiếm theo tên'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
           <AiOutlineSearch size={30} className='search-icon text-white' onClick={handleSearchClick} />
        </div>

        {/* Cart button */}
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
        <Link to="/cart">
          <button>
          <MdLogin  size={20} className="button-cart" />
            Login
          </button>
        </Link>

        <div className={`nav-container ${nav ? '' : 'hidden'}`}>
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className='close-button'
          />
          <h2 className='title'>
            DBCO <span className='font-bold'>Restaurant</span>
          </h2>
          {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          DBCO <span className='font-bold'>Restaurant</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Orders</li>
                <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favorites</li>
                <li className='text-xl py-4 flex'><FaWallet size={25} className='mr-4' /> Wallet</li>
                <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Help</li>
                <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
                <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Invite Friends</li>
            </ul>
        </nav>
      </div>
        </div>
      </div>

      {/* Render the search results */}
     
</>
);
};

export default Navbar;