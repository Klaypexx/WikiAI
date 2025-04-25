import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Проверяем токен на сервере
      axios.get('http://localhost:3001/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setIsAuthenticated(true);
        const name = localStorage.getItem('userName') || '';
        setUserName(name);
      })
      .catch(() => {
        // Если токен невалидный, очищаем хранилище
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
      });
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      userName,
      setUserName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};