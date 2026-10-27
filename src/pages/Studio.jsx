import React from 'react';
import EditorialText from '../components/EditorialText.jsx';
import ImageGallery from '../components/ImageGallery.jsx';
import TeamDirectory from '../components/TeamDirectory.jsx';
import './Studio.css';

export default function Studio() {
  return (
    <div className="studio-page">
      <section className="intro">
        <EditorialText>
          <h2>Our Philosophy</h2>
          <p>Human Space Architects pursues a dialogue between the built environment and the cosmos, translating scientific ambition into poetic spatial narratives.</p>
        </EditorialText>
      </section>

      <section className="image-showcase">
        <ImageGallery images={['/src/assets/project1.jpg', '/src/assets/project1.jpg']} />
      </section>

      <section className="team">
        <h2>Team</h2>
        <TeamDirectory />
      </section>
    </div>
  );
}
