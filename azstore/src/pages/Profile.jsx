import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPersonFill, BsShieldFillCheck, BsGeoAltFill, BsSave, BsPencil } from 'react-icons/bs';
import { useUser } from '../context/UserContext';
import UserLocationMap from '../components/UserLocationMap';
import './Profile.css';

const Profile = () => {
  const { user, location, orders, updateProfile } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
  });

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="not-logged-in">
            <h2>Please Log In</h2>
            <p>You need to be logged in to view your profile.</p>
            <button onClick={() => navigate('/login')} className="login-redirect-btn">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      zipCode: user?.zipCode || '',
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-avatar">
            <span className="avatar-letter">
              {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="profile-header-info">
            <h1>{user.name || 'User'}</h1>
            <p className="profile-email">{user.email}</p>
            <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
              {user.role === 'admin' ? (
                <>
                  <BsShieldFillCheck className="role-icon" /> Admin
                </>
              ) : (
                <>
                  <BsPersonFill className="role-icon" /> Regular User
                </>
              )}
            </span>
          </div>
        </motion.div>

        <div className="profile-content">
          {/* Personal Details Section */}
          <motion.section
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="section-header">
              <h2>Personal Details</h2>
              {!isEditing && (
                <button onClick={handleEdit} className="edit-btn">
                  <BsPencil className="icon-btn" /> Edit
                </button>
              )}
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="detail-input"
                  />
                ) : (
                  <p>{user.name || 'Not set'}</p>
                )}
              </div>

              <div className="detail-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="detail-item">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="detail-input"
                  />
                ) : (
                  <p>{user.phone || 'Not set'}</p>
                )}
              </div>

              <div className="detail-item">
                <label>Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className="detail-input"
                  />
                ) : (
                  <p>{user.address || 'Not set'}</p>
                )}
              </div>

              <div className="detail-item">
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={editData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="detail-input"
                  />
                ) : (
                  <p>{user.city || 'Not set'}</p>
                )}
              </div>

              <div className="detail-item">
                <label>Zip Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={editData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                    className="detail-input"
                  />
                ) : (
                  <p>{user.zipCode || 'Not set'}</p>
                )}
              </div>
            </div>

            {location && (
              <div className="location-info">
                <label>
                  <BsGeoAltFill className="location-icon" /> Current Location
                </label>
                <p className="location-coords">
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
                <UserLocationMap 
                  latitude={location.latitude} 
                  longitude={location.longitude} 
                />
              </div>
            )}

            {isEditing && (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  <BsSave className="icon-btn" /> Save Changes
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            )}
          </motion.section>

          {/* Recent Orders Section */}
          <motion.section
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="section-header">
              <h2>Recent Orders</h2>
              <span className="orders-count">{orders.length} order(s)</span>
            </div>

            {orders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
                <button onClick={() => navigate('/products')} className="shop-btn">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="order-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
                        <p className="order-date">{formatDate(order.orderDate)}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="order-items">
                      <h4>Items:</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <img src={item.image} alt={item.title} className="order-item-image" />
                          <div className="order-item-info">
                            <p className="order-item-title">{item.title}</p>
                            <p className="order-item-details">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="order-item-total">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <strong>Total: ${order.total?.toFixed(2) || '0.00'}</strong>
                      </div>
                      <button className="view-order-btn">View Details</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

