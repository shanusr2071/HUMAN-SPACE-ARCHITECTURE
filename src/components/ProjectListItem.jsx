import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectListItem.css';

export default function ProjectListItem({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="project-item">
      <div className="image-wrapper">
        <img src={project.heroImage} alt={project.title} />
        <div className="overlay">
          <h3>{project.title}</h3>
          <p>{project.location}</p>
        </div>
      </div>
    </Link>
  );
}
