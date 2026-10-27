import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';
import ProjectDetailLayout from '../components/ProjectDetailLayout.jsx';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div style={{ padding: '2rem' }}>Project not found.</div>;
  }

  return <ProjectDetailLayout project={project} />;
}
