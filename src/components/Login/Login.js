// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    
    // Gọi API để lấy danh sách users
    axios.get('https://656af8a9dac3630cf727840b.mockapi.io/login/login')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []); 

  const handleLogin = () => {
    
    // Kiểm tra đăng nhập
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      login(user); // Truyền thông tin user khi đăng nhập thành công
      alert('Đăng nhập thành công!');
      navigate('/');
    } else {
      // Đăng nhập thất bại
      alert('Sai mạt khẩu hoặc tên đăng nhập');
    }
  };
  return (
    <div classNameName="Login ">
      
      {isLoggedIn ? (
        <h1></h1>
      ) : (
      <>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
       LOGIN
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Đăng nhập vào tài khoản của bạn
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập email của bạn</label>
                      <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gamil" required=""
                      value={username} onChange={(e) => setUsername(e.target.value)}
                      ></input>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                      <input type="password" name="password" id="password" placeholder="•••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                       value={password} onChange={(e) => setPassword(e.target.value)}>

                       </input>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Nhớ mật khẩu</label>
                          </div>
                      </div>
                  
                  </div>
                  <button type="submit"  class="flex items-center justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleLogin}
                  >Đăng nhập</button>
                   <Link to="/register">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-4">
                     Bạn chưa có tài khoản? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng kí</a>
                  </p></Link>
              </form>
          </div>
      </div>
  </div>
</section>
      </>
      )}
    </div>
  );
}

export default Login;
