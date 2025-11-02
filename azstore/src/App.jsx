import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Navbar from './assets/components/Navbar';
import Footer from './components/Footer';
import LocationPermission from './components/LocationPermission';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <UserProvider>
              <div className="app">
                <LocationPermission />
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </UserProvider>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
