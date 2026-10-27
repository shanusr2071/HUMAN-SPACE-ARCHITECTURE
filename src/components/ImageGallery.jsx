import React from 'react';
import ExpandableProject from './expandableproject.jsx';
import './ImageGallery.css';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery" aria-label="Project photo gallery">
      {images.map((src, idx) => (
        <figure key={idx} className="image-gallery-item">
          <ExpandableProject
            src={src}
            alt={`Architectural plate ${idx + 1}`}
          />
        </figure>
      ))}
    </div>
  );
}
