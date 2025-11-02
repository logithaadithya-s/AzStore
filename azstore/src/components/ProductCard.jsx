import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="product-card"
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <motion.div
          className="product-image-container"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </motion.div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-rating">
            <span>⭐ {product.rating?.rate || 'N/A'}</span>
            <span>({product.rating?.count || 0})</span>
          </div>
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <motion.button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              aria-label="Add to cart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

