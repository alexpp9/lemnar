import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
const centerPosition = [46.9912496612831, 26.949505559324678];
const lemnarPosition = [46.996592394744276, 26.938211518481594];
const googleMapsUrl = 'https://maps.app.goo.gl/XHZQnKhMf8GhgWYq5';
const Map = () => {
  // Custome Icon Marker
  const customIcon = new Icon({
    iconUrl:
      'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-512.png',
    iconSize: [25, 25],
  });

  return (
    <div className="col-12 col-md-6">
      <div className="shadow-sm border rounded h-100">
        <MapContainer
          center={centerPosition}
          zoom={10}
          style={{ width: '100%', height: '540px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={lemnarPosition} icon={customIcon}>
            <Popup>
              <h5>
                Get direction to{' '}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lemnar
                </a>
              </h5>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
