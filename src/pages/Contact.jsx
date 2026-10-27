import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="details">
        <h2>Contact Us</h2>
        <p>Human Space Architects<br />
          123 Orbital Avenue<br />
          Cosmos City, Earth 00001<br />
          Email: info@humanspacearch.com<br />
          Phone: +1 (555) 123‑4567</p>
      </section>
      <section className="cta">
        <a href="https://wa.me/15551234567" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
          WhatsApp Us
        </a>
      </section>
    </div>
  );
}
