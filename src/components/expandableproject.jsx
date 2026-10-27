import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageLightbox from './ImageLightbox.jsx';
import './expandable.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ExpandableProject
 * 
 * An architectural project card with two independent viewing interactions:
 * 1. Expand-in-place: Clicking the image toggles between compact (340px)
 *    and expanded (80vh), revealing full monograph details below the image
 *    in normal document flow. Recalculates GSAP ScrollTrigger layout upon finish.
 * 2. Full-screen viewing: Clicking the clearly visible full-screen button opens
 *    a dedicated full-viewport lightbox without triggering expand-in-place.
 */
export default function ExpandableProject({
  project,
  title,
  category,
  location,
  year,
  image,
  src,
  alt,
  caption,
  description,
  number,
  index,
  objectPosition,
  className = '',
  initialExpanded = false,
  onToggle,
}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const fullscreenTriggerRef = useRef(null);

  // Harmonize data from either `project` object or individual props
  const p = project || {};
  const projectTitle = p.title || title || 'Architectural Work';
  const projectImage = p.heroImage || p.image || image || src || '';
  const projectCategory = p.category || category || '';
  const projectLocation = p.location || location || caption || '';
  const projectYear = p.year || year || '';
  const projectIndex = p.index || index || number || '';
  const projectDescription = p.description || description || '';
  const projectQuote = p.quote || '';
  const projectArea = p.area || '';
  const projectStatus = p.status || '';
  const projectMaterials = p.materials || '';
  const projectId = p.id || '';
  const pos = p.objectPosition || objectPosition || 'center center';
  const imageAlt = p.alt || alt || `${projectTitle}${projectLocation ? ` - ${projectLocation}` : ''}`;

  // Automatically recalculate GSAP ScrollTrigger layout coordinates after expansion or collapse
  useEffect(() => {
    // 720ms allows the 700ms cubic-bezier transition to fully settle without mid-animation thrashing
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 720);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleToggle = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleFullscreenClick = (e) => {
    // Prevent triggering expand-in-place when clicking the full-screen control
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className={`expandable-project-card ${isExpanded ? 'is-expanded' : ''} ${className}`}>
        {/* Minimalist Compact Header */}
        <div className="expandable-compact-header">
          <div className="expandable-compact-meta">
            {projectIndex && <span className="expandable-compact-index">{projectIndex}</span>}
            {projectIndex && <span className="expandable-compact-sep">—</span>}
            <h3 className="expandable-compact-title">{projectTitle}</h3>
          </div>
          {projectLocation && (
            <div className="expandable-compact-location">
              <span>{projectLocation}</span>
              {projectYear && <span className="expandable-compact-year">({projectYear})</span>}
            </div>
          )}
        </div>

        {/* Interactive Image Frame (Expand-in-Place Target) */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? `Collapse ${projectTitle} monograph details`
              : `Expand ${projectTitle} in-place to full-height view and specifications`
          }
          className={`expandable-image-frame ${isExpanded ? 'is-expanded' : ''}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <img
            src={projectImage}
            alt={imageAlt}
            className="expandable-image-element"
            loading="lazy"
            style={{ objectPosition: pos }}
          />

          {/* Clearly Visible Full-Screen Control (Top-Right) */}
          <button
            ref={fullscreenTriggerRef}
            type="button"
            className="expandable-fullscreen-btn"
            onClick={handleFullscreenClick}
            onKeyDown={(e) => e.stopPropagation()} // Prevent Enter/Space keydown from bubbling to image frame
            aria-label={`Open ${projectTitle} in full-screen lightbox`}
            title="Open in Full-Screen"
          >
            <svg
              className="expandable-fullscreen-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            <span>Full-Screen</span>
          </button>

          {/* Expand-in-place Status Pill (Bottom-Right) */}
          <div className="expandable-badge" aria-hidden="true">
            <svg
              className="expandable-badge-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isExpanded ? (
                <>
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </>
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </>
              )}
            </svg>
            <span>{isExpanded ? 'Collapse' : 'Expand Project'}</span>
          </div>
        </div>

        {/* Animated Details Drawer Below Image (Revealed when Expanded) */}
        <div
          className={`expandable-details-drawer ${isExpanded ? 'is-expanded' : ''}`}
          aria-hidden={!isExpanded}
        >
          <div className="expandable-details-inner">
            <div className="expandable-details-body">
              {/* Category & Location Sub-header */}
              <div className="expandable-meta-row">
                {projectCategory && (
                  <span className="expandable-category-badge">
                    {projectCategory}
                  </span>
                )}
                {projectLocation && (
                  <span className="expandable-location-tag">
                    {projectLocation} {projectYear ? `— ${projectYear}` : ''}
                  </span>
                )}
              </div>

              {/* Full Architectural Heading */}
              <h2 className="expandable-details-title">{projectTitle}</h2>

              {/* Architectural Quote */}
              {projectQuote && (
                <blockquote className="expandable-details-quote">
                  “{projectQuote}”
                </blockquote>
              )}

              {/* Authentic Curatorial Description */}
              {projectDescription && (
                <p className="expandable-details-description">
                  {projectDescription}
                </p>
              )}

              {/* Architectural Specifications Table (Area, Status, Materials) */}
              {(projectArea || projectStatus || projectMaterials) && (
                <div className="expandable-specs-grid">
                  {projectArea && (
                    <div className="expandable-spec-item">
                      <span className="expandable-spec-label">Area</span>
                      <span className="expandable-spec-value">{projectArea}</span>
                    </div>
                  )}
                  {projectStatus && (
                    <div className="expandable-spec-item">
                      <span className="expandable-spec-label">Status</span>
                      <span className="expandable-spec-value">{projectStatus}</span>
                    </div>
                  )}
                  {projectMaterials && (
                    <div className="expandable-spec-item expandable-spec-item--wide">
                      <span className="expandable-spec-label">Material Palette</span>
                      <span className="expandable-spec-value">{projectMaterials}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Monograph Case Study Action */}
              {projectId && (
                <div className="expandable-details-actions">
                  <Link
                    to={`/projects/${projectId}`}
                    className="expandable-details-cta"
                    aria-label={`View full project monograph for ${projectTitle}`}
                  >
                    <span>Explore Full Case Study</span>
                    <span className="expandable-cta-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Separate Full-Viewport Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={projectImage}
        alt={imageAlt}
        title={projectTitle}
        category={projectCategory}
        location={projectLocation}
        year={projectYear}
        triggerRef={fullscreenTriggerRef}
      />
    </>
  );
}
