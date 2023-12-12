// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for user info on page load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedIn(true);
      setUsername(user.username);
      setName(user.name);
      setIsAdmin(user.isAdmin || false);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const login = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    setName(user.name);
    setIsAdmin(user.username.includes('@Admin'));
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername('');
    setName('');
    setIsAdmin(false);
    localStorage.removeItem('user');
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, name, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
