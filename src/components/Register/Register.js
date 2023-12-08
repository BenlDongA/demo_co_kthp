import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Gửi dữ liệu đăng ký lên API
    axios.post('https://656af8a9dac3630cf727840b.mockapi.io/login/login', { username, password, name })
      .then(response => {
        // Xử lý phản hồi từ API (nếu cần)
        console.log('Registration successful:', response.data);
        alert('Registration successful!');
        // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
        navigate('/login');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Error registering user. Please try again.');
      });
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <h2>Register</h2>
      <h2>Register</h2>
      <h2>Register</h2>

      <form>
      <label>
         Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br></br>
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
        <button type="button" onClick={handleRegister}>Register</button>
        <Link to="/login">
          <button type="button">Back to Login</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
