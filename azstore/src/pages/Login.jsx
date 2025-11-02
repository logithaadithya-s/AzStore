import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('user'); // 'user' or 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Simple login - in a real app, this would verify against a backend
      if (formData.email && formData.password) {
        // Get saved user role from localStorage if exists
        const savedUser = localStorage.getItem('azstore_user');
        let role = 'user';
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            if (parsed.email === formData.email) {
              role = parsed.role || 'user';
            }
          } catch (e) {
            // Keep default role
          }
        }
        const userData = {
          name: formData.email.split('@')[0] || 'User',
          email: formData.email,
          loginTime: new Date().toISOString(),
          role: role,
        };
        login(userData);
        navigate('/');
      } else {
        setError('Please fill in all fields');
      }
    } else {
      // Signup
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      const userData = {
        name: formData.name,
        email: formData.email,
        loginTime: new Date().toISOString(),
        role: userRole,
      };
      login(userData);
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="login-card"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h2>
          <motion.p
            className="login-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isLogin
              ? 'Sign in to continue shopping'
              : 'Sign up to get started'}
          </motion.p>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </motion.div>
            )}

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isLogin ? 0.1 : 0.2 }}
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isLogin ? 0.2 : 0.3 }}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </motion.div>

            {!isLogin && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </motion.div>
            )}

            {!isLogin && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label>Account Type</label>
                <div className="role-selection">
                  <motion.button
                    type="button"
                    className={`role-option ${userRole === 'user' ? 'active' : ''}`}
                    onClick={() => setUserRole('user')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    👤 Regular User
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`role-option ${userRole === 'admin' ? 'active' : ''}`}
                    onClick={() => setUserRole('admin')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    👑 Admin
                  </motion.button>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </form>

          <motion.div
            className="toggle-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  });
                  setUserRole('user');
                }}
                className="toggle-link"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>

          <motion.div
            className="back-to-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/">← Back to Home</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

