import React from 'react';
import ProjectMetadata from './ProjectMetadata.jsx';
import EditorialText from './EditorialText.jsx';
import ImageGallery from './ImageGallery.jsx';
import LocationMap from './LocationMap.jsx';
import './ProjectDetailLayout.css';

export default function ProjectDetailLayout({ project }) {
  return (
    <article className="project-detail">
      {/* Hero Image */}
      <section className="hero" style={{ backgroundImage: `url(${project.heroImage})` }} />

      {/* Metadata */}
      <section className="metadata">
        <ProjectMetadata project={project} />
      </section>

      {/* Description */}
      <section className="description">
        <EditorialText>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </EditorialText>
      </section>

      {/* Image Gallery */}
      <section className="gallery">
        <ImageGallery images={project.gallery} />
      </section>

      {/* Location Map */}
      <section className="map">
        <LocationMap />
      </section>
    </article>
  );
}
