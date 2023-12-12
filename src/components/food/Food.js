// Food.jsx
import React, { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import { useCart } from '../cart/CartContext';
import { useAuth } from '../Login/AuthProvider';
import axios from 'axios';
const Food = () => {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]); // Danh sách sản phẩm
  const [originalFoods, setOriginalFoods] = useState([]); // Danh sách sản phẩm gốc từ API
  const [selectedType, setSelectedType] = useState('All'); // Loại sản phẩm được chọn
  const [selectedPrice, setSelectedPrice] = useState('All'); // Giá sản phẩm được chọn
  const [isClicked, setIsClicked] = useState(true); // Trạng thái click
  const { isAdmin } = useAuth(); // Kiểm tra quyền admin
  const { isLoggedIn } = useAuth(); // Sử dụng useAuth để kiểm tra đăng nhập

  // Hàm lấy dữ liệu sản phẩm từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://655f02f3879575426b4459ed.mockapi.io/anh');
        const data = response.data;
        setOriginalFoods(data);
        setFoods(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchData();
  }, []);
  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
    } else {
      // Logic thêm vào giỏ hàng nếu đã đăng nhập
      addToCart(item);
    }
  };

  // Hàm lọc sản phẩm theo loại
  const filterType = (type) => {
    if (type === 'All') {
      setFoods(originalFoods);
    } else {
      const filteredData = originalFoods.filter((item) => item.type === type);
      setFoods(filteredData);
    }
    setSelectedType(type);
    setIsClicked(true); // Cập nhật trạng thái khi có click vào button loại sản phẩm
  };

  // Hàm lọc sản phẩm theo giá
  const filterPrice = (price) => {
    let filteredData = [...originalFoods]; // Tạo bản sao của danh sách sản phẩm gốc

    if (selectedType !== 'All') {
      filteredData = originalFoods.filter((item) => item.type === selectedType);
    }

    if (price === 'All') {
      setFoods(filteredData);
    } else if (price === 'LessThan10') {
      filteredData = filteredData.filter((item) => item.price < 10);
      setFoods(filteredData);
    } else if (price === 'MoreThan10') {
      filteredData = filteredData.filter((item) => item.price >= 10);
      setFoods(filteredData);
    }

    setSelectedPrice(price);
    setIsClicked(true); // Cập nhật trạng thái khi có click vào button giá sản phẩm
  };

  // Hàm xóa sản phẩm(admin)
  const handleDeleteProduct = (productId) => {
    if (isAdmin) {
      // Logic để xóa sản phẩm
      axios.delete(`https://655f02f3879575426b4459ed.mockapi.io/anh/${productId}`)
        .then(() => {
          const updatedFoods = foods.filter(item => item.id !== productId);
          setFoods(updatedFoods);
        })
        .catch(error => console.error('Error deleting product:', error));
    } else {
      alert('You do not have permission to delete products.');
    }
  };

  // Hàm tạo sản phẩm mới(admin)
  const handleCreateProduct = () => {
    if (isAdmin) {
      const name = prompt('Nhập tên sản phẩm:');
      const price = parseFloat(prompt('nhập giá sản phẩm:'));
      const image = prompt('Nhập URL ảnh sản phẩm:');
      const type = prompt('Nhập Loại:');

      if (name && !isNaN(price) && image && type) {
        // Gọi API để tạo sản phẩm mới
        axios.post('https://655f02f3879575426b4459ed.mockapi.io/anh', { name, price, image, type })
          .then(response => {
            const newProduct = response.data;
            setFoods([...foods, newProduct]);
          })
          .catch(error => console.error('Error creating product:', error));
      } else {
        alert('Vu lòng nhập lại thông tin.');
      }
    } else {
      alert('You do not have permission to create products.');
    }
  };

  // Hàm chỉnh sửa sản phẩm(admin)
  const handleEditProduct = (productId, existingProduct) => {
    if (isAdmin) {
      const updatedFields = { ...existingProduct }; // Tạo bản sao của các trường thông tin sản phẩm

      const newName = prompt('Enter new product name:');
      const newPrice = parseFloat(prompt('Enter new product price:'));
      const newImage = prompt('Enter new product image URL:');
      const newType = prompt('Enter new product type:');

      if (newName !== null && newName !== '') {
        updatedFields.name = newName;
      }

      if (!isNaN(newPrice)) {
        updatedFields.price = newPrice;
      }

      if (newImage !== null && newImage !== '') {
        updatedFields.image = newImage;
      }

      if (newType !== null && newType !== '') {
        updatedFields.type = newType;
      }

      // Gọi API để cập nhật thông tin sản phẩm
      axios.put(`https://655f02f3879575426b4459ed.mockapi.io/anh/${productId}`, updatedFields)
        .then(response => {
          const updatedProduct = response.data;
          // Giả sử foods là mảng các sản phẩm
          const updatedFoods = foods.map(product => {
            if (product.id === productId) {
              return updatedProduct;
            }
            return product;
          });
          setFoods(updatedFoods);
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      alert('You do not have permission to edit products.');
    }
  };



  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
 
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        
       MENU
      </h1>
  
      <div className='flex flex-col lg:flex-row justify-between'>
        <div>
          <p className='font-bold text-gray-700'>Filter Type</p>
                  <div className='flex justify-between flex-wrap'>
                  <button
              onClick={() => filterType('All')}
              className={`m-1 border-orange-600 ${
                selectedType === 'All' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
              }`}
            >
              All
            </button>
              <button
                onClick={() => filterType('BBQ')}
                className={`m-1 border-orange-600 ${
                  selectedType === 'BBQ' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
                }`}
              >
                BBQ
              </button>
              <button
                onClick={() => filterType('hai san')}
                className={`m-1 border-orange-600 ${
                  selectedType === 'hai san' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
                }`}
              >
                Hải sản
              </button>
              <button
                onClick={() => filterType('lau')}
                className={`m-1 border-orange-600 ${
                  selectedType === 'lau' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
                }`}
              >
                Lẩu
              </button>
              <button
                onClick={() => filterType('nuoc')}
                className={`m-1 border-orange-600 ${
                  selectedType === 'nuoc' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
                }`}
              >
                Đồ uống
              </button>
      
        </div>
        </div>

        <div>
          <p className='font-bold text-gray-700'>Filter Price</p>
          <div className='flex justify-between max-w-[390px] w-full'>
        <button
          onClick={() => filterPrice('All')}
          className={`m-1 border-orange-600  ${
            selectedPrice === 'All'  && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterPrice('LessThan10')}
          className={`m-1 border-orange-600  ${
            selectedPrice === 'LessThan10' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
          }`}
        >
          Dưới $10
        </button>
        <button
          onClick={() => filterPrice('MoreThan10')}
          className={`m-1 border-orange-600  ${
            selectedPrice === 'MoreThan10' && isClicked ? 'bg-orange-600 text-white' : 'text-orange-600'
          }`}
        >
          Trên $10
        </button>
      </div>
        </div>
      </div>
      {isAdmin && (
         
            <div className='flex justify-between px-2 py-4'>
              <button onClick={handleCreateProduct}>Thêm món ăn +</button>
            </div>

        )}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
     
          {foods.map((item, index) => (
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
                {isAdmin && <button onClick={() => handleDeleteProduct(item.id)}>X</button>}
                {isAdmin && (
                   <button onClick={() => handleEditProduct(item.id)}><MdModeEdit /></button>
                  )}

            
                <button onClick={() => handleAddToCart(item)}>Add to cart +</button>
                <p>
            
               
                  <span className='bg-orange-500 text-white p-1 rounded-full'>
                    {item.price}$
                  </span>
               
                </p>
               
              </div>
            </div>
          ))
                }
      
      </div>
    </div>
  );
};

export default Food;