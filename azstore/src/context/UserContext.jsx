import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('azstore_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('azstore_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Toggle user role between admin and user
  const toggleRole = () => {
    if (user) {
      const updatedUser = {
        ...user,
        role: user.role === 'admin' ? 'user' : 'admin',
      };
      setUser(updatedUser);
      localStorage.setItem('azstore_user', JSON.stringify(updatedUser));
    }
  };

  // Add a new order
  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'completed',
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  // Get user orders
  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter((order) => order.userEmail === user.email);
  };

  // Update user profile
  const updateProfile = (profileData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...profileData,
      };
      setUser(updatedUser);
      localStorage.setItem('azstore_user', JSON.stringify(updatedUser));
    }
  };

  // Don't automatically request location - let LocationPermission component handle it
  // This effect will only run when updateLocation is called

  useEffect(() => {
    localStorage.setItem('azstore_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData) => {
    // Ensure role is set (default to 'user' if not provided)
    const userWithRole = {
      ...userData,
      role: userData.role || 'user',
    };
    setUser(userWithRole);
    localStorage.setItem('azstore_user', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    setLocation(null);
    setLocationError(null);
    localStorage.removeItem('azstore_user');
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError(error.message);
          console.error('Geolocation error:', error);
        },
        options
      );
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    location,
    locationError,
    orders: getUserOrders(),
    login,
    logout,
    updateLocation,
    isAuthenticated,
    isAdmin,
    toggleRole,
    addOrder,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

