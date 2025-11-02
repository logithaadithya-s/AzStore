import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <motion.h1
            className="cart-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p>Your cart is empty</p>
            <motion.button
              onClick={() => navigate('/products')}
              className="shop-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="cart-title">Your Cart</h1>
          <motion.button
            onClick={clearCart}
            className="clear-cart-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="cart-content">
          <div className="cart-items">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="summary-title">Order Summary</h2>
            <motion.div
              className="summary-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </motion.div>
            <motion.div
              className="summary-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Shipping</span>
              <span>Free</span>
            </motion.div>
            <div className="summary-divider"></div>
            <motion.div
              className="summary-row total"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.6 }}
            >
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </motion.div>
            <motion.button
              className="checkout-btn"
              onClick={() => {
                if (!user) {
                  alert('Please login to proceed with checkout');
                  navigate('/login');
                  return;
                }
                
                // Create order
                const orderData = {
                  userEmail: user.email,
                  items: cart,
                  total: getCartTotal(),
                };
                
                addOrder(orderData);
                clearCart();
                alert('Order placed successfully! You can view it in your profile.');
                navigate('/profile');
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Proceed to Checkout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

