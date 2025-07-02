import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Changed from 'smooth' for better page transition
    });

    // Force a reflow/repaint to ensure new page content is visible
    document.body.style.opacity = '0.99';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 10);

    // Add a small delay to ensure animations have time to complete
    const timeout = setTimeout(() => {
      // Remove any stale animations or transitions
      const animatingElements = document.querySelectorAll('.motion-reduce:not([data-motion="false"])');
      animatingElements.forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 