import React from 'react';
import './ProjectMetadata.css';

export default function ProjectMetadata({ project }) {
  return (
    <dl className="project-metadata">
      <div className="project-metadata__item">
        <dt>Project</dt>
        <dd>{project.title}</dd>
      </div>
      <div className="project-metadata__item">
        <dt>Location</dt>
        <dd>{project.location}</dd>
      </div>
      <div className="project-metadata__item">
        <dt>Typology</dt>
        <dd>{project.category}</dd>
      </div>
      {project.year && (
        <div className="project-metadata__item">
          <dt>Year / Status</dt>
          <dd>{project.year} — {project.status}</dd>
        </div>
      )}
      {project.materials && (
        <div className="project-metadata__item project-metadata__item--wide">
          <dt>Material Palette</dt>
          <dd>{project.materials}</dd>
        </div>
      )}
    </dl>
  );
}

