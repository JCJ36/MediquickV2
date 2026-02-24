import React, { useEffect, useState, useContext, useMemo } from "react";
import { ERPContext } from "../context/ERPContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// --- Icons ---
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const pharmIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [30, 45], iconAnchor: [15, 45], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function MapController({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 16, { duration: 1.5 });
  }, [target, map]);
  return null;
}

export default function OrderPage() {
  // const { orderType, setConfirmedPharmacy } = useContext(ERPContext);\
  const { orderType, userLocation, fetchLocation, setConfirmedPharmacy } = useContext(ERPContext);
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert("Unable to get your location")
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchPharmacies = async () => {
        setLoading(true);
        const query = `[out:json];(node["amenity" = "pharmacy"](around:5000,${userLocation.lat},${userLocation.lng});way["amenity" = "pharmacy"](around:5000,${userLocation.lat},${userLocation.lng}););out center;`;
        try {
          const response = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: query });
          const data = await response.json();
          setPharmacies(data.elements || []);
        } catch (err) {
          console.error("Overpass error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPharmacies();
    }
  }, [userLocation]);

  const sortedPharmacies = useMemo(() => {
    if (!userLocation) return pharmacies;
    return [...pharmacies].map(p => ({
      ...p,
      distance: calculateDistance(userLocation.lat, userLocation.lng, p.lat || p.center.lat, p.lon || p.center.lon)
    })).sort((a, b) => a.distance - b.distance);
  }, [pharmacies, userLocation]);

  const selectedPharmacy = pharmacies.find(p => p.id === selectedId);
  const mapTarget = selectedPharmacy ? [selectedPharmacy.lat || selectedPharmacy.center.lat, selectedPharmacy.lon || selectedPharmacy.center.lon] : null;

  const handleConfirmPharmacy = () => {
    if (!selectedPharmacy) return;
    setConfirmedPharmacy({ 
      id: selectedPharmacy.id, 
      name: selectedPharmacy.tags?.name || "Unnamed Pharmacy" 
    });
    // Navigate to the new Medicine Selection Page
    navigate("/order/medicines"); 
  };

  if (!userLocation) return <div className="text-center mt-10">Initializing map...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* UPDATED HEADER WITH BACK BUTTON */}
      <div className="bg-gray-100 p-4 border border-b-0 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold">
            {orderType === "delivery" ? "Delivery Order" : "Pickup Order"}
          </h1>
        </div>
        
        {/* Optional: Indicator showing current search area */}
        <span className="text-xs bg-white px-3 py-1 rounded-full border text-gray-500">
          Searching within 5km
        </span>
      </div>

      <div className="flex flex-col md:flex-row h-150 border rounded-b-lg overflow-hidden bg-white shadow-lg">
        <div className="flex-1 relative">
          <MapContainer 
            key={`${userLocation.lat}-${userLocation.lng}`} 
            center={[userLocation.lat, userLocation.lng]} 
            zoom={14} 
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            {pharmacies.map((p) => {
              const pos = [p.lat || p.center.lat, p.lon || p.center.lon];
              return (
                <Marker 
                  key={p.id} 
                  position={pos} 
                  icon={selectedId === p.id ? selectedIcon : pharmIcon}
                  eventHandlers={{ click: () => setSelectedId(p.id) }}
                >
                  <Popup><strong>{p.tags?.name || "Pharmacy"}</strong></Popup>
                </Marker>
              );
            })}
            <MapController target={mapTarget} />
          </MapContainer>
        </div>

        <div className="w-full md:w-80 flex flex-col border-l bg-white">
          <div className="flex-1 overflow-y-auto">
            {loading ? <p className="p-4 text-center">Loading...</p> : sortedPharmacies.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`p-4 border-b cursor-pointer transition-colors ${selectedId === p.id ? "bg-blue-50 border-l-4 border-l-red-500" : "hover:bg-gray-50 border-l-4 border-l-transparent"}`}
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">{p.tags?.name || "Local Pharmacy"}</span>
                  <span className="text-xs text-green-600 font-bold">{p.distance.toFixed(1)} km</span>
                </div>
                {selectedId === p.id && (
                  <button onClick={handleConfirmPharmacy} className="mt-3 w-full bg-red-500 text-white text-xs py-2 rounded font-bold uppercase">
                    Select This Pharmacy
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}