import React from 'react';
import heroImg from '../assets/hero.jpg';
import './TeamDirectory.css';

const team = [
  { name: 'Alice Novak', role: 'Founder / Lead Architect', photo: heroImg },
  { name: 'Bob Rivera', role: 'Structural Engineer', photo: heroImg },
  { name: 'Cara Liu', role: 'Interior Designer', photo: heroImg },
];

export default function TeamDirectory() {
  return (
    <div className="team-directory">
      {team.map((member) => (
        <div key={member.name} className="team-member">
          <div className="team-member__photo-frame">
            <img src={member.photo} alt={member.name} className="team-member__img" />
          </div>
          <h3 className="team-member__name">{member.name}</h3>
          <p className="team-member__role">{member.role}</p>
        </div>
      ))}
    </div>
  );
}

