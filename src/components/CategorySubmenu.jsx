import React from 'react';
import { projects } from '../data/projects.js';
import './CategorySubmenu.css';

// Extract unique categories from the placeholder data
const categories = [...new Set(projects.map((p) => p.category))];

export default function CategorySubmenu() {
  return (
    <nav className="category-submenu" aria-label="Project categories">
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <button type="button" className="category-btn">
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
