// Food.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../cart/CartContext';
import { FaHeart } from "react-icons/fa";
import SearchBar from './search_food';
import { removeDiacritics } from '../until';
const Food = () => {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://655f02f3879575426b4459ed.mockapi.io/anh'
      );
      const data = await response.json();
      setOriginalFoods(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
useEffect(() => {
  // Lọc danh sách món ăn dựa trên searchQuery (không cần dấu)
  const sanitizedSearchQuery = removeDiacritics(searchQuery);
  const filteredFoods = originalFoods.filter((item) =>
    removeDiacritics(item.name).toLowerCase().includes(sanitizedSearchQuery.toLowerCase())
  );
  setFoods(filteredFoods);
}, [searchQuery, originalFoods]);


  const filterType = (category) => {
    if (category === 'All') {
      setFoods(originalFoods);
    } else {
      const filteredData = originalFoods.filter((item) => item.type === category);
      setFoods(filteredData);
    }

    setSelectedType(category);
  };

  const filterPrice = (price) => {
    if (price === 'All') {
      setFoods(originalFoods);
    } else {
      const filteredData = originalFoods.filter((item) => item.price === price);
      setFoods(filteredData);
    }

    setSelectedPrice(price);
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
 
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        
        Top Rated Menu Items
      </h1>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className='flex flex-col lg:flex-row justify-between'>
        <div>
          <p className='font-bold text-gray-700'>Filter Type</p>
          <div className='flex justify-between flex-wrap'>
            <button
              onClick={() => filterType('All')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedType === 'All' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              All
            </button>
            <button
              onClick={() => filterType('BBQ')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedType === 'BBQ' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              BBQ
            </button>
            <button
              onClick={() => filterType('hai san')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedType === 'hai san' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              Hải Sản
            </button>
            <button
              onClick={() => filterType('lau')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedType === 'lau' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              Lẫu
            </button>
            <button
              onClick={() => filterType('nuoc')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedType === 'nuoc' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              Đồ Uống
            </button>
            {/* Add more buttons for other types as needed */}
          </div>
        </div>

        <div>
          <p className='font-bold text-gray-700'>Filter Price</p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button
              onClick={() => filterPrice('All')}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedPrice === 'All' ? 'bg-orange-600 text-white' : ''
              }`}
            >
              All
            </button>
            {/* Add more buttons for other prices as needed */}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          foods.map((item, index) => (
            <div
              key={index}
              className='border shadow-lg rounded-lg hover:scale-105 duration-300'
            >
               
              <img
                src={item.image}
                alt={item.name}
                
                className='w-full h-[200px] object-cover rounded-t-lg'
              />
              <div className='flex justify-between px-2 py-4'>
              
                <p className='font-bold'>{item.name}</p>
                <button onClick={() => addToCart(item)}>Add to cart +</button>
                <p>
            
               
                  <span className='bg-orange-500 text-white p-1 rounded-full'>
                    {item.price}$
                  </span>
                  <p className=''><FaHeart size={25}/></p>
                </p>
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Food;
