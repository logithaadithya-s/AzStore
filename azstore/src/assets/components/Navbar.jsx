import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPersonFill, BsShieldFillCheck, BsGeoAltFill } from 'react-icons/bs';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import './Navbar.css';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { getCartItemsCount } = useCart();
  const { user, location, logout, isAdmin, toggleRole } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <motion.h2
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            AzStore
          </motion.h2>
        </Link>
      </div>

      <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/products" onClick={closeMobileMenu}>Products</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/cart" className="cart-link" onClick={closeMobileMenu}>
            Cart
            {getCartItemsCount() > 0 && (
              <motion.span
                className="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {getCartItemsCount()}
              </motion.span>
            )}
          </Link>
        </motion.li>
        {user && (
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mobile-user-info">
              <span>{user.name || user.email}</span>
              {location && (
                <span className="mobile-location">
                  <BsGeoAltFill className="location-icon-small" /> Location Active
                </span>
              )}
            </div>
          </motion.li>
        )}
        {!user && (
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
          </motion.li>
        )}
        {user && isAdmin() && (
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/admin" onClick={closeMobileMenu}>Admin</Link>
          </motion.li>
        )}
      </ul>

      <div className="navbar-right">
        {user && (
          <div className="user-info-nav">
            {location && (
              <motion.div
                className="location-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                title={`Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              >
                <BsGeoAltFill />
              </motion.div>
            )}
            <div
              className="user-menu-container"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <motion.button
                className="user-menu-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </motion.button>
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="user-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="user-dropdown-info">
                      <p className="user-name">{user.name || 'User'}</p>
                      <p className="user-email">{user.email}</p>
                      <p className="user-role">
                        {isAdmin() ? (
                          <>
                            <BsShieldFillCheck className="role-icon-small" /> Admin
                          </>
                        ) : (
                          <>
                            <BsPersonFill className="role-icon-small" /> User
                          </>
                        )}
                      </p>
                      {location && (
                        <p className="user-location">
                          <BsGeoAltFill className="location-icon-small" /> {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="profile-link-button"
                    >
                      <BsPersonFill className="icon-btn" /> View Profile
                    </Link>
                    <button
                      onClick={() => {
                        toggleRole();
                        setShowUserMenu(false);
                      }}
                      className="role-toggle-button"
                    >
                      Switch to {isAdmin() ? 'User' : 'Admin'}
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        {!user && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login" className="login-button-nav">
              Login
            </Link>
          </motion.div>
        )}
        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? '🌙' : '☀️'}
        </motion.button>
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </motion.nav>
  );
}
