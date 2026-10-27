import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <span className="contact-eyebrow">Studio Inquiries</span>
        <h1 className="contact-title">Initiate a Spatial Dialogue</h1>
        <p className="contact-subtitle">
          We welcome conversations with prospective clients, cultural institutions, and collaborators regarding built works and spatial commissions.
        </p>
      </header>

      <div className="contact-layout">
        <section className="contact-card">
          <span className="contact-card__tag">Studio Address</span>
          <h2 className="contact-card__title">Headquarters</h2>
          <address className="contact-address">
            <span>Human Space Architects</span>
            <span>123 Orbital Avenue, Suite 400</span>
            <span>Cosmos City, 10001</span>
          </address>
        </section>

        <section className="contact-card">
          <span className="contact-card__tag">Direct Communications</span>
          <h2 className="contact-card__title">Inquiries & Press</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-method__label">Electronic Mail</span>
              <a href="mailto:info@humanspacearch.com" className="contact-link">
                info@humanspacearch.com
              </a>
            </div>
            <div className="contact-method">
              <span className="contact-method__label">Telephone</span>
              <a href="tel:+15551234567" className="contact-link">
                +1 (555) 123‑4567
              </a>
            </div>
          </div>

          <div className="contact-cta">
            <a
              href="https://wa.me/15551234567"
              className="whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Message to Human Space Architects"
            >
              Direct Studio Message (WhatsApp) <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

