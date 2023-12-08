// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // Thêm state để lưu giữ username
  const [name, setName] = useState(''); // Thêm state để lưu giữ username

  const login = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    setName(user.name) 
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(''); // Đặt lại giá trị username khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
