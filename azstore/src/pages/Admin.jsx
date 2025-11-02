import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { getAllProducts } from '../services/api';
import Loader from '../components/Loader';
import './Admin.css';

// For demo purposes, using a placeholder. In production, get this from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

const Admin = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: 'electronics',
  });

  useEffect(() => {
    if (isAuthenticated()) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    // In a real app, you would verify the credential with your backend
    // For demo purposes, we'll just create a user object
    const userData = {
      email: 'admin@azstore.com',
      name: 'Admin User',
      picture: '',
    };
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to add the product
    // For demo purposes, we'll just add it to local state
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      rating: { rate: 0, count: 0 },
    };
    
    setProducts([product, ...products]);
    setNewProduct({
      title: '',
      price: '',
      description: '',
      image: '',
      category: 'electronics',
    });
    alert('Product added successfully! (This is a demo - product is stored locally)');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted! (This is a demo - changes are local only)');
    }
  };

  if (!isAuthenticated()) {
    // Demo login for testing without Google OAuth setup
    const handleDemoLogin = () => {
      const userData = {
        email: 'admin@azstore.com',
        name: 'Demo Admin',
        picture: '',
      };
      login(userData);
    };

    return (
      <div className="admin-page">
        <div className="admin-login">
          <div className="login-card">
            <h2>Admin Login</h2>
            <p>Please login to access the admin panel</p>
            {GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID' ? (
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    alert('Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
            ) : (
              <div className="demo-login">
                <p className="demo-notice">
                  Note: Google OAuth not configured. Using demo login.
                </p>
                <button onClick={handleDemoLogin} className="demo-login-btn">
                  Login as Demo Admin
                </button>
              </div>
            )}
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const avgPrice = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : '0.00';
  const categoriesCount = new Set(products.map(p => p.category)).size;

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Admin Panel</h1>
            <p className="admin-subtitle">Manage your products and inventory</p>
          </div>
          <div className="admin-user-info">
            <div className="user-details">
              <span className="welcome-text">Welcome,</span>
              <span className="user-name">{user?.name || user?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>${avgPrice}</h3>
              <p>Average Price</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏷️</div>
            <div className="stat-content">
              <h3>{categoriesCount}</h3>
              <p>Categories</p>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {/* Add Product Form */}
          <section className="admin-section">
            <div className="section-header-inline">
              <h2>Add New Product</h2>
            </div>
            <form onSubmit={handleAddProduct} className="add-product-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  required
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Add Product
              </button>
            </form>
          </section>

          {/* Products List */}
          <section className="admin-section">
            <div className="section-header">
              <h2>All Products ({products.length})</h2>
              <div className="header-actions">
                <button onClick={fetchProducts} className="refresh-btn">
                  🔄 Refresh
                </button>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : products.length === 0 ? (
              <div className="no-products-admin">
                <p>No products found. Add your first product above!</p>
              </div>
            ) : (
              <div className="admin-products-grid">
                {products.map((product) => (
                  <div key={product.id} className="admin-product-card">
                    <div className="admin-product-image-wrapper">
                      <img src={product.image} alt={product.title} />
                      <div className="product-overlay">
                        <span className="product-id">ID: {product.id}</span>
                      </div>
                    </div>
                    <div className="admin-product-info">
                      <h3>{product.title}</h3>
                      <div className="product-meta">
                        <span className="product-category-badge">{product.category}</span>
                        <span className="admin-product-price">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="product-rating-admin">
                        <span>⭐ {product.rating?.rate || 'N/A'}</span>
                        <span>({product.rating?.count || 0})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="delete-btn"
                      >
                        🗑️ Delete Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;

