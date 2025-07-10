import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';

const Layout = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  // Simplified page transition variants for mobile
  const pageVariants = {
    fadeIn: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.3, // Faster on mobile
        ease: "easeOut",
      }
    },
    fadeOut: {
      opacity: 0,
      y: isMobile ? -10 : -20, // Reduced movement on mobile
      transition: {
        duration: isMobile ? 0.15 : 0.2, // Faster on mobile
        ease: "easeIn",
      }
    }
  };

  return (
    <div className="bg-primary min-h-screen relative overflow-hidden">
      {/* Simplified background patterns for mobile */}
      <div className="fixed inset-0 z-0 opacity-10 sm:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.02)_0%,rgba(20,30,48,0.02)_50%)] sm:bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.03)_0%,rgba(20,30,48,0.03)_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.02)_0%,rgba(20,30,48,0.02)_50%)] sm:bg-[radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.03)_0%,rgba(20,30,48,0.03)_50%)]"></div>
        
        {/* Simplified grid pattern for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        )}
      </div>
      
      <Navbar />
      
      {/* Simplified loader for page transitions */}
      {isTransitioning && <Loader text={`Loading ${location.pathname.substring(1) || 'Home'}...`} />}
      
      <motion.main
        className="pt-16 sm:pt-20 relative z-10"
        variants={pageVariants}
        initial="fadeIn"
        animate={transitionStage}
        onAnimationComplete={() => {
          if (transitionStage === "fadeOut") {
            setDisplayLocation(location);
            setTransitionStage("fadeIn");
            
            // Faster timeout on mobile
            setTimeout(() => {
              setIsTransitioning(false);
            }, isMobile ? 150 : 300);
          }
        }}
      >
        {displayLocation.pathname === location.pathname ? children : null}
      </motion.main>
    </div>
  );
};

export default Layout; 