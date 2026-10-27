import React from 'react';
import './Navigation.css';

const navItems = ['Home', 'Portfolio', 'About', 'Contact'];

export default function Navigation() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        {navItems.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="nav-link">
              {item.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
