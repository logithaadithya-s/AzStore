import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Optional: Show a notification
    alert(`${quantity} item(s) added to cart!`);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error-message">
          <p>Product not found</p>
          <button onClick={() => navigate('/products')} className="back-btn">
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      
      <div className="product-detail-container">
        <motion.div
          className="product-image-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </motion.div>

        <motion.div
          className="product-info-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-rating-section">
            <div className="rating-badge">
              <span>⭐ {product.rating?.rate || 'N/A'}</span>
              <span>({product.rating?.count || 0} reviews)</span>
            </div>
            <span className="product-category">{product.category}</span>
          </div>

          <div className="product-price-section">
            <span className="product-detail-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <motion.button
                onClick={() => handleQuantityChange(-1)}
                className="quantity-btn"
                disabled={quantity <= 1}
                whileHover={{ scale: quantity <= 1 ? 1 : 1.1 }}
                whileTap={{ scale: quantity <= 1 ? 1 : 0.9 }}
              >
                −
              </motion.button>
              <motion.span
                className="quantity-value"
                key={quantity}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {quantity}
              </motion.span>
              <motion.button
                onClick={() => handleQuantityChange(1)}
                className="quantity-btn"
                disabled={quantity >= 10}
                whileHover={{ scale: quantity >= 10 ? 1 : 1.1 }}
                whileTap={{ scale: quantity >= 10 ? 1 : 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>

          <motion.button
            onClick={handleAddToCart}
            className="add-to-cart-detail-btn"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart ({quantity})
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

