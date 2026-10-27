import React from 'react';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand-block">
          <img src={logo} alt="Human Space Architects Logo" className="footer__logo-img" />
          <div>
            <h3>Human Space Architects</h3>
            <p>© 2026 All rights reserved.</p>
          </div>
        </div>
        <div className="footer__contact-block">
          <h4>Studio & Inquiries</h4>
          <p>
            123 Orbital Avenue, Suite 400<br />
            Cosmos City, 10001<br />
            <a href="mailto:info@humanspacearch.com">info@humanspacearch.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
