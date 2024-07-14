import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";

import type { Map as LeafletMap } from "leaflet";
import type { Location } from "../api/types";

type MapProps = {
  location: Location | null;
};

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ location }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude]);
    }
  }, [location]);

  return (
    <MapContainer
      style={{ height: "100vh" }}
      center={[57.70887, 11.97456]}
      ref={mapRef}
      zoom={13}
      scrollWheelZoom
      fadeAnimation
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        detectRetina={true}
        maxZoom={19}
        minZoom={1}
      />
      {location && (
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup maxWidth={200} keepInView={true} autoPan>
            {location.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
