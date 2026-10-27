import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageLightbox.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImageLightbox
 * 
 * A full-viewport architectural lightbox modal:
 * - Rendered in a portal to avoid z-index / clipping constraints.
 * - Dark, unobtrusive backdrop with centered object-fit: contain image.
 * - Smooth fade-and-scale opening and closing transitions.
 * - Closes on Escape or backdrop click; clicking the image does not close it.
 * - Locks background scroll on open and returns user to the exact same scroll position.
 * - Re-synchronizes GSAP ScrollTrigger after closing so underlying scroll animations stay accurate.
 * - Full dialog accessibility, focus management, and keyboard support.
 */
export default function ImageLightbox({
  isOpen,
  onClose,
  src,
  alt = 'Architectural photograph',
  title = '',
  category = '',
  location = '',
  year = '',
  triggerRef = null,
}) {
  const [isActive, setIsActive] = useState(false);
  const closeBtnRef = useRef(null);
  const savedScrollYRef = useRef(0);

  // Trigger entrance transition on next animation frame after portal mount
  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => {
      setIsActive(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  // Lock background scroll, prevent layout shift, and guarantee exact scroll restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save exact scroll position before locking
    const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    savedScrollYRef.current = currentScrollY;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      // Return user to the exact same scroll position
      window.scrollTo(0, savedScrollYRef.current);
      // Re-synchronize GSAP ScrollTrigger after overflow is restored
      ScrollTrigger.refresh();
    };
  }, [isOpen]);

  // Smooth exit transition handler
  const handleRequestClose = React.useCallback(() => {
    setIsActive(false);
    setTimeout(() => {
      onClose();
    }, 350);
  }, [onClose]);

  // Escape key handler - clean dependency array to prevent duplicate listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleRequestClose]);

  // Focus management: Focus close button on open, restore to trigger on close
  useEffect(() => {
    if (isOpen && isActive) {
      closeBtnRef.current?.focus();
    } else if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, isActive, triggerRef]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop directly, not its children
    if (e.target === e.currentTarget) {
      handleRequestClose();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Full-screen view of ${title}` : 'Full-screen architectural image'}
      className={`lightbox-overlay ${isActive ? 'is-active' : ''}`}
      onClick={handleBackdropClick}
    >
      {/* Header Bar */}
      <div className="lightbox-header">
        <div className="lightbox-project-info">
          {category && <span className="lightbox-category">{category}</span>}
          {title && <h2 className="lightbox-title">{title}</h2>}
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox-close-btn"
          onClick={handleRequestClose}
          aria-label="Close full-screen view (Press Escape)"
        >
          <svg
            className="lightbox-close-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span>Close</span>
        </button>
      </div>

      {/* Center Image Stage */}
      <div className="lightbox-stage" onClick={handleBackdropClick}>
        <div
          className="lightbox-image-wrapper"
          onClick={(e) => e.stopPropagation()} // Clicking the image does not close
        >
          <img
            src={src}
            alt={alt}
            className="lightbox-image"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="lightbox-footer">
        <div className="lightbox-caption">
          {location && <span>{location}</span>}
          {location && year && <span> — </span>}
          {year && <span>{year}</span>}
        </div>
        <span className="lightbox-hint">Click backdrop or press Esc to close</span>
      </div>
    </div>,
    document.body
  );
}
