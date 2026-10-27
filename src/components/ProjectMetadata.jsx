import React from 'react';
import './ProjectMetadata.css';

export default function ProjectMetadata({ project }) {
  return (
    <dl className="project-metadata">
      <dt>Title</dt>
      <dd>{project.title}</dd>
      <dt>Location</dt>
      <dd>{project.location}</dd>
      <dt>Category</dt>
      <dd>{project.category}</dd>
    </dl>
  );
}
