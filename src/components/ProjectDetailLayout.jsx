import React from 'react';
import { Link } from 'react-router-dom';
import ProjectMetadata from './ProjectMetadata.jsx';
import EditorialText from './EditorialText.jsx';
import ImageGallery from './ImageGallery.jsx';
import LocationMap from './LocationMap.jsx';
import './ProjectDetailLayout.css';

export default function ProjectDetailLayout({ project }) {
  return (
    <article className="project-detail">
      <nav className="project-detail__nav" aria-label="Project navigation">
        <Link to="/projects" className="project-detail__back-link">
          ← Back to Selected Works
        </Link>
      </nav>

      {/* Hero Image */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${project.heroImage})` }}
        aria-label={`${project.title} primary architectural photograph`}
      />

      {/* Title & Metadata */}
      <header className="project-detail__header">
        <span className="project-detail__index">{project.index || '01'} / 05 • {project.category}</span>
        <h1 className="project-detail__title">{project.title}</h1>
        {project.quote && (
          <blockquote className="project-detail__quote">
            “{project.quote}”
          </blockquote>
        )}
      </header>

      {/* Metadata */}
      <section className="metadata">
        <ProjectMetadata project={project} />
      </section>

      {/* Description */}
      <section className="description">
        <EditorialText>
          <p>{project.description}</p>
        </EditorialText>
      </section>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="gallery">
          <h2 className="project-detail__section-title">Visual Monograph</h2>
          <ImageGallery images={project.gallery} />
        </section>
      )}

      {/* Location Map */}
      {project.location && (
        <section className="map">
          <h2 className="project-detail__section-title">Site Context — {project.location}</h2>
          <LocationMap src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location)}&t=&z=11&ie=UTF8&iwloc=&output=embed`} />
        </section>
      )}
    </article>
  );
}

