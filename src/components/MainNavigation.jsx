import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
];

export default function MainNavigation() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
