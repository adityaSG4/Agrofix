import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    if (token && role) setUser({ token, role });
  }, []);


  const login = async (email, password) => {
    const res = await axios.post('https://agrofixcore.onrender.com/login', { email, password });
    const { token,user } = res.data;
    const decoded = JSON.parse(atob(token.split('.')[1]));
    Cookies.set('token', token);
    Cookies.set('role', decoded.role);
    Cookies.set('username', user.username);
    Cookies.set('email', user.email);
    setUser({ token, role: decoded.role });
  };

  
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('username');
    Cookies.remove('email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
