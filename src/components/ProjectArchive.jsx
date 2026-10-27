import React from 'react';
import { projects } from '../data/projects.js';
import ExpandableProject from './expandableproject.jsx';
import './ProjectArchive.css';

export default function ProjectArchive({ selectedCategory = 'All' }) {
  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="project-archive" aria-label="Architectural Project Gallery">
      {filtered.map((project) => (
        <article key={project.id} className="archive-item">
          <ExpandableProject project={project} />
        </article>
      ))}
    </section>
  );
}

