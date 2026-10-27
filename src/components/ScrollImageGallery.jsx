import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as defaultProjects } from '../data/projects.js';
import './ScrollImageGallery.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollImageGallery
 * A BIG-inspired architectural scrolling exhibition.
 * Pinned viewport where each subsequent architectural photograph
 * acts as an incoming foreground layer that progressively slides up
 * and covers the previous image, synchronized directly with vertical scroll.
 */
export default function ScrollImageGallery({ items = defaultProjects }) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items || items.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned progressive covering transition
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const panels = panelRefs.current.filter(Boolean);
        const count = panels.length;

        // Set initial positions:
        // First panel (index 0) is already active at yPercent: 0
        // Every subsequent panel is parked at yPercent: 100 (below the screen)
        panels.forEach((panel, i) => {
          gsap.set(panel, {
            yPercent: i === 0 ? 0 : 100,
            zIndex: i + 1,
          });
        });

        // Total scroll distance proportional to the number of transitions
        const scrollDistance = (count - 1) * window.innerHeight * 1.15;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Sequence: each panel covers the prior one progressively
        for (let i = 1; i < count; i++) {
          const panel = panels[i];
          const innerImage = panel.querySelector('.scroll-gallery__image');

          // Progressive foreground reveal
          tl.to(panel, {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          });

          // Subtle internal image counter-motion for depth
          if (innerImage) {
            tl.fromTo(
              innerImage,
              { yPercent: -12 },
              { yPercent: 0, ease: 'none', duration: 1 },
              '<'
            );
          }
        }

        return () => {
          // Revert cleanly on unmount or screen resize
        };
      }
    );

    return () => mm.revert();
  }, [items]);

  if (!items || items.length === 0) return null;

  const totalCount = items.length;

  return (
    <section ref={containerRef} className="scroll-gallery" aria-label="Curated architectural exhibition">
      <div ref={viewportRef} className="scroll-gallery__viewport">
        {items.map((project, index) => {
          const formattedIndex = String(index + 1).padStart(2, '0');
          const formattedTotal = String(totalCount).padStart(2, '0');

          return (
            <article
              key={project.id || index}
              ref={(el) => (panelRefs.current[index] = el)}
              className="scroll-gallery__panel"
              id={`gallery-project-${project.id}`}
              style={{ zIndex: index + 1 }}
            >
              {/* Full-Bleed Architectural Image */}
              <div className="scroll-gallery__image-container">
                <img
                  src={project.heroImage}
                  alt={`${project.title} - ${project.location}`}
                  className="scroll-gallery__image"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  style={{
                    objectPosition: project.objectPosition || 'center center',
                  }}
                />
              </div>

              {/* Restrained legibility gradient overlay */}
              <div className="scroll-gallery__overlay" aria-hidden="true" />

              {/* Top Navigation & Minimalist Exhibition Counter */}
              <div className="scroll-gallery__topbar">
                <div className="scroll-gallery__counter" aria-label={`Work ${index + 1} of ${totalCount}`}>
                  <span className="scroll-gallery__counter-num">{formattedIndex}</span>
                  <span className="scroll-gallery__counter-sep">/</span>
                  <span className="scroll-gallery__counter-total">{formattedTotal}</span>
                </div>
                {project.category && (
                  <span className="scroll-gallery__badge">
                    {project.category}
                  </span>
                )}
              </div>

              {/* Bottom-left Editorial Typography */}
              <div className="scroll-gallery__content">
                <div className="scroll-gallery__meta">
                  <span className="scroll-gallery__location">
                    {project.location} {project.year ? `— ${project.year}` : ''}
                  </span>
                  <h2 className="scroll-gallery__title">{project.title}</h2>
                  {project.description && (
                    <p className="scroll-gallery__desc">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="scroll-gallery__action">
                  <Link
                    to={`/projects/${project.id}`}
                    className="scroll-gallery__cta"
                    aria-label={`Explore case study for ${project.title}`}
                  >
                    <span className="scroll-gallery__cta-text">Explore Project</span>
                    <span className="scroll-gallery__cta-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
