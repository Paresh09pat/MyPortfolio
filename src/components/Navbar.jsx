import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/90 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      {/* Animated background gradient on scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'linear-gradient(90deg, rgba(14, 23, 42, 0.9), rgba(56, 189, 248, 0.1), rgba(14, 23, 42, 0.9))',
                  'linear-gradient(90deg, rgba(14, 23, 42, 0.9), rgba(244, 114, 182, 0.1), rgba(14, 23, 42, 0.9))',
                  'linear-gradient(90deg, rgba(14, 23, 42, 0.9), rgba(56, 189, 248, 0.1), rgba(14, 23, 42, 0.9))'
                ]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="relative group"
          >
            <Link to="/" className="text-3xl font-bold text-secondary font-mono relative">
              P
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-1 -right-2 text-accent text-sm"
              >
                DEV
              </motion.span>
              
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-md -z-10"
                animate={{ 
                  boxShadow: [
                    "0 0 5px 2px rgba(56, 189, 248, 0.3)", 
                    "0 0 15px 2px rgba(56, 189, 248, 0.6)", 
                    "0 0 5px 2px rgba(56, 189, 248, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </Link>
            <div className="absolute -inset-2 bg-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 text-base font-medium group ${
                    isActive(item.path) ? 'text-secondary' : 'text-textPrimary'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive(item.path) && (
                      <motion.span
                        className="absolute inset-0 bg-secondary/10 rounded-lg"
                        layoutId="activeNavItem"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Hover effect */}
                  <motion.span 
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    whileHover={{ 
                      scale: 1.05,
                      opacity: 1
                    }}
                  />
                  
                  {/* Underline effect */}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-secondary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            {/* Resume button with improved hover effect */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
            >
              <motion.a
                href="/PARESHPATIL.pdf"
                className="px-6 py-2 rounded-lg bg-secondary/10 border border-secondary text-secondary transition-all duration-300 hover:bg-secondary/20 hover:shadow-md hover:shadow-secondary/20"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Resume</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-secondary p-2 hover:text-accent transition-colors duration-300 relative"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-sm -z-10"
              animate={{ 
                boxShadow: [
                  "0 0 5px 0px rgba(56, 189, 248, 0)", 
                  "0 0 10px 2px rgba(56, 189, 248, 0.4)", 
                  "0 0 5px 0px rgba(56, 189, 248, 0)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
            className="fixed top-0 right-0 h-screen w-2/3 bg-tertiary/95 backdrop-blur-lg md:hidden"
          >
            {/* Background gradient animation */}
            <motion.div 
              className="absolute inset-0 opacity-30 -z-10"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(14, 23, 42, 0.9), rgba(56, 189, 248, 0.2), rgba(14, 23, 42, 0.9))',
                  'linear-gradient(135deg, rgba(14, 23, 42, 0.9), rgba(244, 114, 182, 0.2), rgba(14, 23, 42, 0.9))',
                  'linear-gradient(135deg, rgba(14, 23, 42, 0.9), rgba(56, 189, 248, 0.2), rgba(14, 23, 42, 0.9))'
                ]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          
            <div className="flex flex-col items-center pt-20 space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium relative group ${
                      isActive(item.path) ? 'text-secondary' : 'text-textPrimary'
                    } hover:text-secondary transition-colors duration-300`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Underline animation */}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-secondary"
                      initial={{ width: isActive(item.path) ? "100%" : 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                href="/resume.pdf"
                className="px-6 py-2 rounded-lg bg-secondary/10 border border-secondary text-secondary transition-all duration-300 hover:bg-secondary/20 hover:shadow-md hover:shadow-secondary/20"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 