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
      alert('Login successful!');
      navigate('/');
    } else {
      // Đăng nhập thất bại
      alert('Invalid username or password');
    }
  };
  return (
    <div className="Login">
        <h1>sss</h1>
        <h1>sss</h1>

        <h1>sss</h1>
        <h1>sss</h1>
        <h1>sss</h1>
      {isLoggedIn ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <div>
          <h2>Login</h2>
          <form>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>Login</button>
            <Link to="/register">
              <button >Đăng kí</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
