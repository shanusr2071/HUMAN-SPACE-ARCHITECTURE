import React from 'react';
import './TeamDirectory.css';

const team = [
  { name: 'Alice Novak', role: 'Founder / Lead Architect', photo: '/src/assets/hero.jpg' },
  { name: 'Bob Rivera', role: 'Structural Engineer', photo: '/src/assets/hero.jpg' },
  { name: 'Cara Liu', role: 'Interior Designer', photo: '/src/assets/hero.jpg' },
];

export default function TeamDirectory() {
  return (
    <div className="team-directory">
      {team.map((member) => (
        <div key={member.name} className="team-member">
          <img src={member.photo} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
