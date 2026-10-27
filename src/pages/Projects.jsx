import React from 'react';
import CategorySubmenu from '../components/CategorySubmenu.jsx';
import ProjectArchive from '../components/ProjectArchive.jsx';
import './Projects.css';

export default function Projects() {
  return (
    <div className="projects-page">
      <CategorySubmenu />
      <ProjectArchive />
    </div>
  );
}
