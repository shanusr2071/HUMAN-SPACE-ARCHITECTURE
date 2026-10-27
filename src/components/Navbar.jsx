import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container container">
        <Link to="/" className="navbar__brand" aria-label="Human Space Architects Home">
          <img src={logo} alt="Human Space Architects Logo" className="navbar__logo-img" />
          <span className="navbar__brand-name">Human Space Architects</span>
        </Link>
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__list">
            {links.map((link) => (
              <li key={link.to} className="navbar__item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? 'navbar__link active' : 'navbar__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}



