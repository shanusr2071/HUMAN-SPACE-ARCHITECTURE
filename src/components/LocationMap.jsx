import React from 'react';
import './LocationMap.css';

export default function LocationMap({ src = "https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.5%2C-0.11%2C51.51&layer=mapnik" }) {
  return (
    <div className="location-map">
      <iframe
        src={src}
        style={{ border: 0, width: '100%', height: '300px' }}
        allowFullScreen
        loading="lazy"
        title="Location map"
      ></iframe>
    </div>
  );
}
