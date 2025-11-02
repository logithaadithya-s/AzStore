import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './UserLocationMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UserLocationMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return (
      <div className="map-placeholder">
        <p>Location not available</p>
      </div>
    );
  }

  return (
    <div className="location-map-container">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '300px', width: '100%', borderRadius: '8px' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Your Location<br />
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default UserLocationMap;

