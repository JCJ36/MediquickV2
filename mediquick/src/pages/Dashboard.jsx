import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Default icon for marker
const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Dashboard() {
  const { isLoggedIn, branches } = useContext(ERPContext);
  const [orderType, setOrderType] = useState(null);  // "delivery" or "pickup"
  const [nearestBranch, setNearestBranch] = useState(null);

  const userLocation = [14.6, 120.98]; // Example user location

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestPharmacy = () => {
    let closest = null;
    let minDistance = Infinity;

    branches.forEach((branch) => {
      const distance = getDistance(
        userLocation[0],
        userLocation[1],
        branch.position[0],
        branch.position[1]
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = branch;
      }
    });

    setNearestBranch(closest);
  };

  const handleOrderType = (type) => {
    setOrderType(type);
    findNearestPharmacy();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">MediQuick ERP</h1>

      {/* Order Type Options */}
      {!orderType && (
        <div className="space-y-4">
          <button
            onClick={() => handleOrderType("delivery")}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Delivery
          </button>
          <button
            onClick={() => handleOrderType("pickup")}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Pickup
          </button>
        </div>
      )}

      {/* Map for Delivery/Pickup */}
      {orderType && (
        <div className="mt-10 h-[400px] rounded-xl overflow-hidden shadow-lg">
          <MapContainer center={userLocation} zoom={12} className="h-full w-full">
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {branches &&
              branches.map((branch) => (
                <Marker key={branch.id} position={branch.position} icon={defaultIcon}>
                  <Popup>{branch.name}</Popup>
                </Marker>
              ))}

            {nearestBranch && (
              <Marker position={nearestBranch.position} icon={defaultIcon}>
                <Popup>
                  Nearest Pharmacy: {nearestBranch.name} <br />
                  {orderType === "pickup" ? "Ready for Pickup" : "Delivery in progress"}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
