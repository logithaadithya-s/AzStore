import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGeoAltFill, BsX } from 'react-icons/bs';
import { useUser } from '../context/UserContext';
import './LocationPermission.css';

const LocationPermission = () => {
  const { location, locationError, updateLocation } = useUser();
  const [showPrompt, setShowPrompt] = useState(() => {
    // Check if user has already seen/dismissed the prompt
    const dismissed = localStorage.getItem('azstore_location_dismissed');
    return !dismissed && !location && navigator.geolocation;
  });

  const handleAllow = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation();
          setShowPrompt(false);
          localStorage.setItem('azstore_location_dismissed', 'true');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setShowPrompt(false);
          localStorage.setItem('azstore_location_dismissed', 'true');
        },
        options
      );
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('azstore_location_dismissed', 'true');
  };

  if (!showPrompt || location) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="location-permission-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="location-permission-card"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <button
              className="close-btn"
              onClick={handleDismiss}
              aria-label="Close"
            >
              <BsX />
            </button>
            
            <div className="permission-icon">
              <BsGeoAltFill />
            </div>
            
            <h2>Location Access</h2>
            <p>
              We'd like to access your location to provide you with a better shopping experience 
              and show you nearby stores or delivery options.
            </p>
            
            <div className="permission-benefits">
              <p>Benefits:</p>
              <ul>
                <li>Personalized shopping experience</li>
                <li>Find nearby stores</li>
                <li>Accurate delivery estimates</li>
              </ul>
            </div>

            <div className="permission-actions">
              <button
                onClick={handleAllow}
                className="allow-btn"
              >
                Allow Location
              </button>
              <button
                onClick={handleDismiss}
                className="dismiss-btn"
              >
                Not Now
              </button>
            </div>

            <p className="privacy-note">
              Your location data is stored locally and never shared with third parties.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationPermission;

