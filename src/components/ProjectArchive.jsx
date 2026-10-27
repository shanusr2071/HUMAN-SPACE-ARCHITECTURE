import React from 'react';
import { projects } from '../data/projects.js';
import ExpandableProject from './expandableproject.jsx';
import './ProjectArchive.css';

export default function ProjectArchive() {
  return (
    <section className="project-archive" aria-label="Architectural Project Gallery">
      {projects.map((project) => (
        <article key={project.id} className="archive-item">
          <ExpandableProject project={project} />
        </article>
      ))}
    </section>
  );
}
