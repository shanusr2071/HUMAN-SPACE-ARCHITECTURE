import React, { useState } from 'react';
import CategorySubmenu from '../components/CategorySubmenu.jsx';
import ProjectArchive from '../components/ProjectArchive.jsx';
import './Projects.css';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="projects-page">
      <header className="projects-header">
        <span className="projects-eyebrow">Portfolio Index</span>
        <h1 className="projects-title">Selected Works</h1>
        <p className="projects-subtitle">
          An ongoing archive of civic, cultural, and residential structures shaped by landscape, light, and material honesty.
        </p>
      </header>
      <CategorySubmenu
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProjectArchive selectedCategory={selectedCategory} />
    </div>
  );
}

