import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../components/cart/CartContext';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const { addToCart } = useCart();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(`https://655f02f3879575426b4459ed.mockapi.io/anh?search=${query}`);
          const data = await response.json();

          if (data.length === 0) {
            window.alert('không tìm thấy sản phẩm.');
          } else {
            setSearchResults(data);
          }
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        window.alert('Error fetching search results. Please try again.');
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="kq">
      <h1>Search Results</h1>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {searchResults.map((item, index) => (
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
                {/* Add favorite icon if needed */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
