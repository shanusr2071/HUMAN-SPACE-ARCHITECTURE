import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { projects } from '../data/projects.js';
import heroImg from '../assets/hero.jpg';
import logo from '../assets/logo.png';
import './Home.css';

// Architectural projects monograph sequence with authentic project specifications
const chainItems = [
  {
    ...projects[0],
    aspectRatio: '16 / 10',
    studio: 'Human Space Architects',
    designConcept: 'Glulam timber arches sculpted in dialogue with Arctic glacial and tidal topography.',
    curatorialQuote: 'Architecture defined as an artificial landscape conforming to the rhythm of the Arctic tides.',
  },
  {
    ...projects[1],
    aspectRatio: '16 / 10',
    studio: 'Human Space Architects',
    designConcept: 'Thermal mass sculpted into passive wind scoops, harnessing celestial alignment and desert breezes.',
    curatorialQuote: 'Stabilized rammed earth thermal mass sculpted with celestial wind scoops.',
  },
  {
    ...projects[2],
    aspectRatio: '16 / 10',
    studio: 'Human Space Architects',
    designConcept: 'Monolithic cast concrete cantilever projected over sheer bedrock, framing panoramic mountain vistas.',
    curatorialQuote: 'A bold volumetric cantilever projected over sheer bedrock, transforming gravity into an experiential threshold.',
  },
  {
    ...projects[3],
    aspectRatio: '16 / 10',
    studio: 'Human Space Architects',
    designConcept: 'Ascending public pedestrian ribbons extending the Copenhagen waterfront vertically into the skyline.',
    curatorialQuote: 'Extending Copenhagen’s public harbor boardwalk into a continuous, ascending vertical promenade.',
  },
  {
    ...projects[4],
    aspectRatio: '16 / 10',
    studio: 'Human Space Architects',
    designConcept: 'Modular cross-laminated timber bioclimatic research envelope for cold-climate urbanism.',
    curatorialQuote: 'A hyper-efficient climatic envelope testing regenerative biophilic envelopes for cold-climate research.',
  },
];

export default function Home() {
  // Track active compartment on touch/mobile devices where hover is not available
  const [activeTouchId, setActiveTouchId] = useState(null);
  const [isRevealComplete, setIsRevealComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const blackScreenRef = useRef(null);
  const logoBoxRef = useRef(null);

  const toggleTouch = (id) => {
    setActiveTouchId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (isRevealComplete) return;

    const blackScreen = blackScreenRef.current;
    const logoBox = logoBoxRef.current;
    if (!blackScreen || !logoBox) return;

    // Lock body scroll while black screen reveal is playing
    document.body.style.overflow = 'hidden';

    // Set initial states
    gsap.set(blackScreen, {
      yPercent: 0,
      opacity: 1,
      visibility: 'visible',
    });
    gsap.set(logoBox, {
      opacity: 0,
      y: 8,
      scale: 0.98,
    });

    // Synchronized master reveal timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsRevealComplete(true);
      },
    });

    // 1. Logo fades in smoothly as the black screen appears
    tl.to(logoBox, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.15,
    })
    // 2. Generous cinematic hold in deep black space
    .to({}, { duration: 0.65 })
    // 3. Logo fades out smoothly BEFORE the black overlay disappears
    .to(logoBox, {
      opacity: 0,
      y: -6,
      duration: 0.45,
      ease: 'power2.in',
    })
    // 4. Black screen smoothly reveals the homepage underneath
    .to(
      blackScreen,
      {
        yPercent: -100,
        duration: 1.15,
        ease: 'power3.inOut',
      },
      '-=0.08'
    );

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [isRevealComplete]);

  return (
    <div className="home-page">
      {/* BIG-Inspired Cinematic Black Screen Opening Reveal with Centered Logo */}
      {!isRevealComplete && (
        <div
          ref={blackScreenRef}
          className="big-reveal-screen"
          aria-hidden="true"
        >
          {/* Logo is attached directly to the black animation shape */}
          <div ref={logoBoxRef} className="big-reveal-logo-container">
            <img
              src={logo}
              alt="Human Space Architects Emblem"
              className="big-reveal-logo-img"
            />
            <span className="big-reveal-logo-text">Human Space Architects</span>
          </div>
        </div>
      )}

      {/* Cinematic Monochrome Architectural Hero Section */}
      <section className="cinematic-hero" aria-labelledby="cinematic-hero-heading">
        <div className="cinematic-hero__media">
          <img
            src={heroImg}
            alt="Human Space Architects — Cantilevered sculptural architectural structure"
            className="cinematic-hero__image"
            loading="eager"
            fetchPriority="high"
          />
          <div className="cinematic-hero__overlay" aria-hidden="true" />
        </div>

        <div className="cinematic-hero__content">
          <div className="cinematic-hero__editorial">
            <h1 id="cinematic-hero-heading" className="cinematic-hero__headline">
              Architecture that <br className="hero-break" />moves you.
            </h1>
            <p className="cinematic-hero__supporting">
              Thoughtfully designed spaces shaped by light, material, and the way we live.
            </p>
          </div>
        </div>
      </section>

      {/* Single Straight Vertical Column of Interactive Architectural Compartments */}
      <section className="image-chain-section" aria-label="Architectural Portfolio Vertical Chain">
        <div className="chain-column">
          {chainItems.map((item, index) => {
            const isTouchActive = activeTouchId === item.id;

            return (
              <article
                key={item.id}
                id={`project-${item.id}`}
                className={`chain-card ${isTouchActive ? 'is-touch-active' : ''}`}
              >
                {/* Independent Architectural Compartment */}
                <div className="compartment">
                  <div className="compartment-stage">
                    {/* Primary Column: Large Architectural Photograph */}
                    <div className="compartment-image-col">
                      <Link
                        to={`/projects/${item.id}`}
                        className="chain-image-link"
                        aria-label={`View ${item.title} project details`}
                      >
                        <div
                          className="chain-image-wrapper"
                          style={{ aspectRatio: item.aspectRatio }}
                        >
                          <img
                            src={item.heroImage}
                            alt={`${item.title} — ${item.category} in ${item.location}`}
                            className="chain-image"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                        </div>
                      </Link>

                      {/* Touchscreen & Mobile Accessible Toggle */}
                      <button
                        type="button"
                        className="compartment-touch-toggle"
                        onClick={() => toggleTouch(item.id)}
                        aria-expanded={isTouchActive}
                        aria-label={
                          isTouchActive
                            ? `Hide specifications for ${item.title}`
                            : `Reveal specifications for ${item.title}`
                        }
                      >
                        <span className="touch-toggle-text">
                          {isTouchActive ? 'Close Specifications' : 'View Specifications'}
                        </span>
                        <span className="touch-toggle-icon" aria-hidden="true">
                          {isTouchActive ? '✕' : '+'}
                        </span>
                      </button>
                    </div>

                    {/* Reveal Panel 1: Editorial Overview, Title & Concept */}
                    <aside
                      className="compartment-panel compartment-panel--primary"
                      aria-label={`Editorial overview and concept for ${item.title}`}
                    >
                      <div className="compartment-panel__inner">
                        {/* Panel Header */}
                        <div className="compartment-panel__meta">
                          <span className="compartment-panel__index">{item.index} / 05</span>
                          <span className="compartment-panel__dot" aria-hidden="true">•</span>
                          <span className="compartment-panel__type">{item.category}</span>
                        </div>

                        {/* Project Heading */}
                        <h3 className="compartment-panel__title">
                          <Link to={`/projects/${item.id}`} className="compartment-title-link">
                            {item.title}
                          </Link>
                        </h3>

                        {/* Overview Specifications & Concepts */}
                        <dl className="compartment-specs">
                          <div className="compartment-spec-row">
                            <dt className="compartment-spec-label">Studio</dt>
                            <dd className="compartment-spec-value">{item.studio}</dd>
                          </div>
                          <div className="compartment-spec-row">
                            <dt className="compartment-spec-label">Design Concept</dt>
                            <dd className="compartment-spec-value">“{item.curatorialQuote}”</dd>
                          </div>
                          <div className="compartment-spec-row">
                            <dt className="compartment-spec-label">Defining Features</dt>
                            <dd className="compartment-spec-value">{item.description}</dd>
                          </div>
                        </dl>
                      </div>
                    </aside>

                    {/* Reveal Panel 2: Technical Specifications & Monograph Case Study */}
                    <aside
                      className="compartment-panel compartment-panel--secondary"
                      aria-label={`Technical specifications for ${item.title}`}
                    >
                      <div className="compartment-panel__inner">
                        {/* Panel Sub-Header */}
                        <div className="compartment-panel__meta">
                          <span className="compartment-panel__section-tag">Specifications</span>
                          <span className="compartment-panel__dot" aria-hidden="true">•</span>
                          <span className="compartment-panel__type">{item.location}</span>
                        </div>

                        {/* Technical Data List */}
                        <dl className="compartment-specs">
                          <div className="compartment-spec-row">
                            <dt className="compartment-spec-label">Location</dt>
                            <dd className="compartment-spec-value">{item.location}</dd>
                          </div>
                          {item.materials && (
                            <div className="compartment-spec-row">
                              <dt className="compartment-spec-label">Materials</dt>
                              <dd className="compartment-spec-value">{item.materials}</dd>
                            </div>
                          )}
                          {item.area && (
                            <div className="compartment-spec-row">
                              <dt className="compartment-spec-label">Scale & Year</dt>
                              <dd className="compartment-spec-value">
                                {item.area} <span aria-hidden="true">—</span> {item.year} ({item.status})
                              </dd>
                            </div>
                          )}
                        </dl>

                        {/* Case Study Monograph Link */}
                        <div className="compartment-panel__footer">
                          <Link
                            to={`/projects/${item.id}`}
                            className="compartment-panel__cta"
                            aria-label={`Explore full case study for ${item.title}`}
                          >
                            Explore Full Monograph <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    </aside>

                    {/* Reveal Panel 3: Project Location Map */}
                    <aside
                      className="compartment-panel compartment-panel--map"
                      aria-label={`Project location map for ${item.title}`}
                    >
                      <div className="compartment-panel__inner compartment-panel__inner--map">
                        {/* Map Panel Header */}
                        <div className="compartment-panel__meta">
                          <span className="compartment-panel__section-tag">PROJECT LOCATION</span>
                          <span className="compartment-panel__dot" aria-hidden="true">•</span>
                          <span className="compartment-panel__type">{item.location ? 'Mapped Site' : 'Pending Data'}</span>
                        </div>

                        {/* Interactive Embedded Location Map or Neutral Placeholder */}
                        <div className="compartment-map__container">
                          {item.location ? (
                            <iframe
                              title={`Map location of ${item.title} in ${item.location}`}
                              className="compartment-map__frame"
                              src={`https://maps.google.com/maps?q=${encodeURIComponent(item.location)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="compartment-map__placeholder" role="status">
                              <span className="compartment-map__placeholder-icon" aria-hidden="true">📍</span>
                              <p className="compartment-map__placeholder-text">Location data pending client verification.</p>
                            </div>
                          )}
                        </div>

                        {/* Open in Maps Link */}
                        <div className="compartment-panel__footer compartment-map__footer">
                          {item.location ? (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="compartment-map__link"
                              aria-label={`Open map for ${item.title} in external provider`}
                            >
                              <span>Open in Maps</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          ) : (
                            <span className="compartment-map__link-disabled">Site Coordinates TBD</span>
                          )}
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Baseline Plate Caption (Clean & Minimalist below the compartment) */}
                  <figcaption className="chain-caption">
                    <div className="chain-caption__meta">
                      <span className="chain-caption__index">{item.index} / 05</span>
                      <span className="chain-caption__dot" aria-hidden="true">•</span>
                      <span className="chain-caption__category">{item.category}</span>
                    </div>
                    <div className="chain-caption__body">
                      <h2 className="chain-caption__title">
                        <Link to={`/projects/${item.id}`} className="chain-title-link">
                          {item.title}
                        </Link>
                      </h2>
                      <p className="chain-caption__location">
                        {item.location} <span aria-hidden="true">—</span> {item.year}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Editorial Colophon & Studio Navigation */}
      <section className="home-colophon" aria-labelledby="home-colophon-heading">
        <div className="home-colophon__inner">
          <div className="home-colophon__content">
            <span className="home-colophon__eyebrow">Practice & Methodology</span>
            <h2 id="home-colophon-heading" className="home-colophon__title">
              Space, Earth & Human Experience
            </h2>
            <p className="home-colophon__text">
              We approach each architectural commission through tectonic honesty, tactile permanence, and an enduring dialogue between structure and landscape.
            </p>
          </div>
          <div className="home-colophon__actions">
            <Link to="/projects" className="home-colophon__button home-colophon__button--primary">
              View All Projects →
            </Link>
            <Link to="/contact" className="home-colophon__button home-colophon__button--secondary">
              Studio Inquiries →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
