import React from 'react';
import { projects } from '../data/projects.js';
import './CategorySubmenu.css';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function CategorySubmenu({ selectedCategory = 'All', onSelectCategory }) {
  return (
    <nav className="category-submenu" aria-label="Project categories">
      <ul className="category-submenu__list">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory && onSelectCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

