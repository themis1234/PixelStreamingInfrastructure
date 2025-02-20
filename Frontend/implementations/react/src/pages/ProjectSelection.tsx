import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebars from '../components/SideBars'; // Your sidebar component
import styles from '../components/styles.module.css'
import { useNavigate } from 'react-router-dom';

// Custom marker icon for Leaflet in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ProjectSelection: React.FC = () => {
  const navigate = useNavigate()

  const gothenburgPosition: [number, number] = [57.7089, 11.9746]; // Map center
  const jättestenPosition: [number, number] = [57.7193, 11.9121]; // Marker position

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* Full‑screen Map */}
      <MapContainer
        center={jättestenPosition}
        zoom={12}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
            position={jättestenPosition}
            icon={customIcon}
            eventHandlers={{
                click: () => {
                    navigate('/'); // Redirects to the home page
                },
            }}
/>
      </MapContainer>

      {/* Sidebar overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          height: '100vh',
          transition: 'width 0.3s',
          background: 'transparent',
          overflow: 'hidden',
          zIndex: 10,
          // When collapsed, let clicks pass through the empty area so the map stays interactive.
        }}
      >
        <Sidebars>
        <div className={styles.childContainer}>
            <input
                type="text"
                placeholder="Find Distict"
                className={styles.searchField}
            />
            <div className={styles.historySection}>
                <p className={styles.historyTitle}>Recently viewed</p>
                <div className={styles.historyContainer}>
                <div className={styles.historyItem}></div>
                <div className={styles.historyItem}></div>
                <div className={styles.historyItem}></div>
                </div>
            </div>
            </div>
        </Sidebars>
      </div>
    </div>
  );
};

export default ProjectSelection;
