import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as defaultProjects } from '../data/projects.js';
import './HorizontalScrollGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollGallery({ items = defaultProjects }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // Use GSAP MatchMedia for responsive and reduced-motion handling
    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scroll
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const getScrollDistance = () => track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        // Subtle image scale reveal tied to horizontal progress
        const imageContainers = track.querySelectorAll('.h-gallery__img');
        imageContainers.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.07 },
            {
              scale: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'center center',
                scrub: true,
              },
            }
          );
        });

        return () => {
          // Cleanup handled automatically by matchMedia
        };
      }
    );

    return () => mm.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="h-gallery-section" aria-label="Selected architectural works">
      <div ref={trackRef} className="h-gallery-track">
        
        {/* Curatorial Header Slide */}
        <div className="h-gallery__slide h-gallery__slide--intro">
          <div className="h-gallery__intro-inner">
            <div className="h-gallery__kicker">
              <span className="h-gallery__indicator" />
              <span>Curatorial Archive // 01—0{items.length}</span>
            </div>
            <h2 className="h-gallery__intro-headline">
              Spatial Forms<br />
              <em>In Dialogue With Horizon.</em>
            </h2>
            <p className="h-gallery__intro-lead">
              A curated progression of built structures and landscape interventions, where technical structural precision meets atmospheric materiality.
            </p>
            <div className="h-gallery__scroll-hint">
              <span className="h-gallery__scroll-text">Scroll to explore</span>
              <span className="h-gallery__scroll-arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </div>

        {/* Dynamic Project Slides */}
        {items.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={project.id || index}
              className={`h-gallery__slide h-gallery__slide--project ${
                isEven ? 'h-gallery__slide--left' : 'h-gallery__slide--right'
              }`}
            >
              <div className="h-gallery__card">
                
                {/* Left/Right Text Column */}
                <div className="h-gallery__text-col">
                  <div className="h-gallery__meta-header">
                    <span className="h-gallery__index">{project.index || `0${index + 1}`}</span>
                    <span className="h-gallery__sep">/</span>
                    <span className="h-gallery__category">{project.category}</span>
                  </div>

                  <h3 className="h-gallery__title">{project.title}</h3>
                  <div className="h-gallery__location">{project.location} — {project.year}</div>

                  {project.quote && (
                    <blockquote className="h-gallery__quote">
                      “{project.quote}”
                    </blockquote>
                  )}

                  <p className="h-gallery__desc">{project.description}</p>

                  {/* Architectural Specs Plate */}
                  <div className="h-gallery__specs">
                    {project.area && (
                      <div className="h-gallery__spec-item">
                        <span className="h-gallery__spec-label">Area</span>
                        <span className="h-gallery__spec-value">{project.area}</span>
                      </div>
                    )}
                    {project.status && (
                      <div className="h-gallery__spec-item">
                        <span className="h-gallery__spec-label">Status</span>
                        <span className="h-gallery__spec-value">{project.status}</span>
                      </div>
                    )}
                    {project.materials && (
                      <div className="h-gallery__spec-item h-gallery__spec-item--wide">
                        <span className="h-gallery__spec-label">Primary Materials</span>
                        <span className="h-gallery__spec-value">{project.materials}</span>
                      </div>
                    )}
                  </div>

                  <div className="h-gallery__action">
                    <Link
                      to={`/projects/${project.id}`}
                      className="h-gallery__link"
                      aria-label={`View detailed monograph for ${project.title}`}
                    >
                      <span>Explore Project Monograph</span>
                      <span className="h-gallery__link-arrow">→</span>
                    </Link>
                  </div>
                </div>

                {/* Architectural Photography Column */}
                <div className="h-gallery__image-col">
                  <div className="h-gallery__image-frame">
                    <img
                      src={project.heroImage}
                      alt={`${project.title} architectural photography in ${project.location}`}
                      className="h-gallery__img"
                      loading={index < 2 ? 'eager' : 'lazy'}
                      style={{
                        objectPosition: project.objectPosition || 'center center'
                      }}
                    />
                    <div className="h-gallery__img-badge">
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>

              </div>
            </article>
          );
        })}

        {/* Concluding Exhibition Slide */}
        <div className="h-gallery__slide h-gallery__slide--outro">
          <div className="h-gallery__outro-inner">
            <span className="h-gallery__kicker">Complete Works Archive</span>
            <h3 className="h-gallery__outro-title">Explore All Monographic Works</h3>
            <p className="h-gallery__outro-text">
              View our complete body of work spanning masterplans, civic cultural institutes, and experimental residential spaces.
            </p>
            <div className="h-gallery__outro-actions">
              <Link to="/projects" className="h-gallery__btn h-gallery__btn--primary">
                View Project Archive →
              </Link>
              <Link to="/contact" className="h-gallery__btn h-gallery__btn--secondary">
                Studio Inquiries
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
