import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { getCartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <h2 className="logo">AzStore</h2>
        </Link>
      </div>

      <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={closeMobileMenu}>Products</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link" onClick={closeMobileMenu}>
            Cart
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={closeMobileMenu}>Admin</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? '🌙' : '☀️'}
        </button>
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
