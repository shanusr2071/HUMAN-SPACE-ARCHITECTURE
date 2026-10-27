import React from 'react';
import './SiteHeader.css';
import logo from '../assets/logo.png'; // placeholder logo

export default function SiteHeader() {
  return (
    <header className='site-header'>
      <img src={logo} alt='Human Space Architects' className='site-logo' />
    </header>
  );
}
