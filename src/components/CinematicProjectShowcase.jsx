import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as defaultProjects } from '../data/projects.js';
import './CinematicProjectShowcase.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicProjectShowcase
 * 
 * An editorial architectural showcase with synchronized dual-axis scroll animation:
 * - Stage is pinned while scrolling through projects.
 * - Active project information animates VERTICALLY (out: y -50, in: y +60 -> 0).
 * - Associated main architectural image transitions HORIZONTALLY (out: x -100, in: x +100 -> 0).
 * - Both animations are locked in step on the GSAP ScrollTrigger timeline.
 * - Reverse scrolling and unpinning work seamlessly.
 * - Interactive project selection in header for direct navigation.
 * - Images are clickable and link directly to full project monographs.
 * - Adapts cleanly to a natural stacked layout on mobile/tablet without scroll hijacking.
 */
export default function CinematicProjectShowcase({ items = defaultProjects }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const sceneRefs = useRef([]);
  const contentRefs = useRef([]);
  const mediaRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items || items.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned synchronized dual-axis transition (>= 1024px, no reduced motion)
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const scenes = sceneRefs.current.filter(Boolean);
        const contents = contentRefs.current.filter(Boolean);
        const medias = mediaRefs.current.filter(Boolean);
        const count = items.length;
        if (count === 0) return;

        // Set initial positions:
        // Scene 0 is active (content at y: 0, media at x: 0)
        // Subsequent scenes:
        // - Content column parked below (yPercent: 60, opacity: 0)
        // - Media/Image column parked to the right (xPercent: 100, opacity: 1)
        scenes.forEach((scene, i) => {
          gsap.set(scene, {
            zIndex: i + 1,
            visibility: i === 0 ? 'visible' : 'hidden',
          });

          if (contents[i]) {
            gsap.set(contents[i], {
              yPercent: i === 0 ? 0 : 60,
              opacity: i === 0 ? 1 : 0,
            });
          }

          if (medias[i]) {
            gsap.set(medias[i], {
              xPercent: i === 0 ? 0 : 100,
              opacity: 1,
            });
          }
        });

        // Total scroll distance proportional to the number of transitions
        const totalScrollDistance = (count - 1) * window.innerHeight * 1.5;

        // Master Timeline linked to ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'cinematic-showcase-trigger',
            trigger: container,
            pin: true,
            start: 'top top',
            end: () => `+=${totalScrollDistance}`,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const current = Math.min(
                Math.floor(self.progress * count),
                count - 1
              );
              setActiveIndex(current);
            },
          },
        });

        // Chain synchronized dual-axis transitions
        for (let i = 0; i < count - 1; i++) {
          const currentContent = contents[i];
          const nextContent = contents[i + 1];
          const currentMedia = medias[i];
          const nextMedia = medias[i + 1];
          const nextScene = scenes[i + 1];

          // 1. Make next scene visible right as transition initiates
          tl.set(nextScene, { visibility: 'visible' });

          // 2. Animate Information Column VERTICALLY:
          // Outgoing project info moves UP and fades out
          if (currentContent) {
            tl.to(currentContent, {
              yPercent: -50,
              opacity: 0,
              duration: 1.2,
              ease: 'power2.inOut',
            });
          }

          // Incoming project info moves UP from BELOW into position and fades in
          if (nextContent) {
            tl.fromTo(
              nextContent,
              { yPercent: 60, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.inOut',
              },
              '<' // Synchronized start with outgoing content
            );
          }

          // 3. Animate Associated Main Architectural Image HORIZONTALLY:
          // Outgoing image slides OUT to the left
          if (currentMedia) {
            tl.to(
              currentMedia,
              {
                xPercent: -100,
                opacity: 0.7,
                duration: 1.2,
                ease: 'power2.inOut',
              },
              '<' // Synchronized start with text vertical movement
            );
          }

          // Incoming image slides IN from the right
          if (nextMedia) {
            tl.fromTo(
              nextMedia,
              { xPercent: 100, opacity: 1 },
              {
                xPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.inOut',
              },
              '<' // Synchronized start with text vertical movement
            );
          }

          // 4. Resting period so user can absorb the active project as they scroll
          if (i < count - 2) {
            tl.to({}, { duration: 0.5 });
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

  // Functional Project Selection / Jump navigation
  const scrollToProject = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const count = items.length;
    if (count <= 1) return;

    const st = ScrollTrigger.getById('cinematic-showcase-trigger');
    if (st && st.start !== undefined && st.end !== undefined) {
      // Calculate target position in scroll range
      const scrollPos = st.start + (index / (count - 1)) * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    } else {
      // Mobile / reduced motion fallback: scroll directly to the project element
      const targetScene = sceneRefs.current[index];
      if (targetScene) {
        targetScene.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section ref={containerRef} className="cinematic-showcase" aria-label="Curated Architectural Projects Sequence">
      {/* Pinned Stage Container */}
      <div ref={stageRef} className="cinematic-showcase__stage">

        {/* Stage Header / Active Project Counter & Functional Selection */}
        <header className="cinematic-showcase__header">
          <div className="cinematic-showcase__eyebrow">
            <span className="cinematic-showcase__live-dot" />
            <span className="cinematic-showcase__label">Monograph Showcase</span>
          </div>

          {/* Functional Project Selection Navigation */}
          <nav className="cinematic-showcase__nav" aria-label="Project selection">
            {items.map((project, idx) => (
              <button
                key={project.id || idx}
                type="button"
                className={`cinematic-showcase__nav-btn ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => scrollToProject(idx)}
                aria-label={`Jump to project ${idx + 1}: ${project.title}`}
              >
                <span className="cinematic-showcase__nav-num">{project.index || `0${idx + 1}`}</span>
                <span className="cinematic-showcase__nav-name">{project.title}</span>
              </button>
            ))}
          </nav>

          {/* Active Counter */}
          <div className="cinematic-showcase__counter" aria-live="polite">
            <span className="cinematic-showcase__current">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="cinematic-showcase__divider">/</span>
            <span className="cinematic-showcase__total">
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Viewport Holding Synchronized Scenes */}
        <div className="cinematic-showcase__viewport">
          {items.map((project, index) => (
            <article
              key={project.id || index}
              ref={(el) => (sceneRefs.current[index] = el)}
              className={`cinematic-scene ${index === activeIndex ? 'is-active' : ''}`}
              id={`cinematic-project-${project.id}`}
            >
              <div className="cinematic-scene__inner">

                {/* Information Column (Animates Vertically) */}
                <div className="cinematic-scene__content">
                  <div
                    ref={(el) => (contentRefs.current[index] = el)}
                    className="cinematic-scene__content-inner"
                  >
                    <div className="cinematic-scene__meta-top">
                      <span className="cinematic-scene__index">{project.index || `0${index + 1}`}</span>
                      <span className="cinematic-scene__sep">—</span>
                      <span className="cinematic-scene__category">{project.category}</span>
                    </div>

                    <h2 className="cinematic-scene__title">{project.title}</h2>

                    <div className="cinematic-scene__location-year">
                      <span>{project.location}</span>
                      <span className="cinematic-scene__dot">•</span>
                      <span>{project.year}</span>
                    </div>

                    {project.quote && (
                      <blockquote className="cinematic-scene__quote">
                        “{project.quote}”
                      </blockquote>
                    )}

                    <p className="cinematic-scene__description">
                      {project.description}
                    </p>

                    {/* Architectural Specifications Table */}
                    <div className="cinematic-scene__specs">
                      {project.area && (
                        <div className="cinematic-scene__spec-item">
                          <span className="cinematic-scene__spec-label">Area</span>
                          <span className="cinematic-scene__spec-val">{project.area}</span>
                        </div>
                      )}
                      {project.status && (
                        <div className="cinematic-scene__spec-item">
                          <span className="cinematic-scene__spec-label">Status</span>
                          <span className="cinematic-scene__spec-val">{project.status}</span>
                        </div>
                      )}
                      {project.materials && (
                        <div className="cinematic-scene__spec-item cinematic-scene__spec-item--full">
                          <span className="cinematic-scene__spec-label">Material Palette</span>
                          <span className="cinematic-scene__spec-val">{project.materials}</span>
                        </div>
                      )}
                    </div>

                    <div className="cinematic-scene__cta-wrap">
                      <Link
                        to={`/projects/${project.id}`}
                        className="cinematic-scene__cta"
                        aria-label={`View full project monograph for ${project.title}`}
                      >
                        <span>Explore Case Study</span>
                        <span className="cinematic-scene__cta-arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Architectural Photography Column (Animates Horizontally) */}
                <div className="cinematic-scene__media">
                  <div
                    ref={(el) => (mediaRefs.current[index] = el)}
                    className="cinematic-scene__media-frame"
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className="cinematic-scene__media-link"
                      aria-label={`View ${project.title} case study`}
                    >
                      <img
                        src={project.heroImage}
                        alt={`${project.title} - ${project.location}`}
                        className="cinematic-scene__image"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        style={{
                          objectPosition: project.objectPosition || 'center center'
                        }}
                      />
                      <div className="cinematic-scene__media-overlay" aria-hidden="true" />

                      <div className="cinematic-scene__hover-badge" aria-hidden="true">
                        <span>View Case Study</span>
                        <span className="cinematic-scene__hover-arrow">→</span>
                      </div>

                      <div className="cinematic-scene__location-pill">
                        <span>{project.location}</span>
                      </div>
                    </Link>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <footer className="cinematic-showcase__footer">
          <div className="cinematic-showcase__scroll-guide">
            <span className="cinematic-showcase__scroll-arrow" aria-hidden="true">↓</span>
            <span className="cinematic-showcase__scroll-text">Scroll to advance transition</span>
          </div>

          <div className="cinematic-showcase__progress-bar" aria-hidden="true">
            <div
              className="cinematic-showcase__progress-fill"
              style={{
                width: `${((activeIndex + 1) / items.length) * 100}%`
              }}
            />
          </div>
        </footer>

      </div>
    </section>
  );
}
