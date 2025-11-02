import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsGeoAltFill, BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { useUser } from '../context/UserContext';
import './Footer.css';

const Footer = () => {
  const { user, location } = useUser();

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="footer-container">
        <div className="footer-content">
          <motion.div className="footer-section" variants={itemVariants}>
            <h3>AzStore</h3>
            <p>Your one-stop shop for quality products at unbeatable prices.</p>
            {user && (
              <div className="user-location-info">
                <p className="location-label">
                  <BsGeoAltFill className="location-icon" /> Your Location:
                </p>
                {location ? (
                  <p className="location-coords">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                ) : (
                  <p className="location-pending">Getting location...</p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Account</h4>
            <ul>
              {user ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/login">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
            </ul>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Connect</h4>
            <div className="social-links">
              <motion.a
                href="#facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
                className="social-link"
              >
                <BsFacebook />
              </motion.a>
              <motion.a
                href="#twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
                className="social-link"
              >
                <BsTwitter />
              </motion.a>
              <motion.a
                href="#instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
                className="social-link"
              >
                <BsInstagram />
              </motion.a>
              <motion.a
                href="#linkedin"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
                className="social-link"
              >
                <BsLinkedin />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          variants={itemVariants}
        >
          <p>
            © {currentYear} AzStore. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

