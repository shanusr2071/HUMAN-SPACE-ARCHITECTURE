import React from 'react';
import EditorialText from '../components/EditorialText.jsx';
import ImageGallery from '../components/ImageGallery.jsx';
import TeamDirectory from '../components/TeamDirectory.jsx';
import project1Img from '../assets/project1.jpg';
import nordicImg from '../assets/gallery-1-nordic.jpg';
import './Studio.css';

export default function Studio() {
  return (
    <div className="studio-page">
      <header className="studio-header">
        <span className="studio-eyebrow">The Practice</span>
        <h1 className="studio-title">Philosophy & Spatial Craft</h1>
      </header>

      <section className="studio-intro">
        <EditorialText>
          <p>
            Human Space Architects is an architectural studio committed to spatial clarity, tactile permanence, and the quiet power of proportion. We understand architecture as an enduring envelope shaped by light, climate, and the natural choreography of human life.
          </p>
          <blockquote>
            “True architectural elegance lies not in decorative excess, but in the generosity of space, the honesty of materials, and the stillness of natural light.”
          </blockquote>
          <p>
            Every commission begins with rigorous contextual inquiry. Rather than imposing predetermined forms, our studio develops structural logic from geological strata, solar alignments, and tactile craft—resolving complex spatial programs into serene, dignified environments.
          </p>
        </EditorialText>
      </section>

      <section className="studio-pillars">
        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-index">01</span>
            <h3 className="pillar-title">Spatial Restraint</h3>
            <p className="pillar-text">
              Precision in volumetric balance and quiet geometric rhythm, creating calm spaces that invite contemplation and unhurried dwelling.
            </p>
          </div>
          <div className="pillar-card">
            <span className="pillar-index">02</span>
            <h3 className="pillar-title">Material Honesty</h3>
            <p className="pillar-text">
              Selecting enduring tectonic materials—stabilized rammed earth, monolithic concrete, and structural timber—that weather gracefully with age.
            </p>
          </div>
          <div className="pillar-card">
            <span className="pillar-index">03</span>
            <h3 className="pillar-title">Environmental Dialogue</h3>
            <p className="pillar-text">
              Passive climatic strategies, solar choreography, and topographical continuity integrated directly into the structural envelope.
            </p>
          </div>
        </div>
      </section>

      <section className="studio-image-showcase">
        <div className="studio-section-meta">
          <span className="studio-section-tag">Atmosphere & Detail</span>
          <h2 className="studio-section-title">Built Explorations</h2>
        </div>
        <ImageGallery images={[project1Img, nordicImg]} />
      </section>

      <section className="studio-team">
        <div className="studio-section-meta">
          <span className="studio-section-tag">Leadership</span>
          <h2 className="studio-section-title">Studio Principals</h2>
        </div>
        <TeamDirectory />
      </section>
    </div>
  );
}

