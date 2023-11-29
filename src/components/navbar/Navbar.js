import React, { useState } from 'react';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill } from 'react-icons/bs';
import { FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link ,useNavigate} from'react-router-dom';
import './navbar.css'
const Navbar = () => {
const [nav, setNav] = useState(false)
const navigate = useNavigate();

  return (

    <div className='container'>

      <div className='flex items-center'>
        <div onClick={()=> setNav(!nav)} className=''>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='lo'>DBCO Restaurant </h1>
        <div onClick={() => navigate('/')} className='Home'>
          HOME
        </div>
      </div>  

      {/* Search Input */}
      <div className='search'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
        />
      </div>
      {/* Cart button */}
      <Link to="/cart">
        <button>
      <BsFillCartFill size={20} className="button-cart" />
        Cart
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
  <nav>
    <ul className='nav-list'>
      {/* Repeat the following list item structure for each navigation item */}
      <li className='nav-item'>
        <TbTruckDelivery size={25} className='icon' />
        Orders
      </li>
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
  
  );
};

export default Navbar;
