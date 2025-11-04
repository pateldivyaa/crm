
// ============================================
// FILE: src/context/AuthContext.jsx
// ============================================
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const userData = {
      id: 1,
      name: 'Purvi Mihir Shukla',
      email: email,
      role: 'Admin',
      company: 'Mana Techno Corporation'
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-token-' + Date.now());
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
