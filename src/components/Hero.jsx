import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [charIndex, setCharIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const nameText = "Paresh";
  
  // Check if device is mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // For text typing effect - faster on mobile
  useEffect(() => {
    if (charIndex < nameText.length - 1) {
      const timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, isMobile ? 150 : 200); // Faster typing on mobile
      return () => clearTimeout(timer);
    }
  }, [charIndex, isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Reduced delay
        staggerChildren: isMobile ? 0.1 : 0.2 // Faster on mobile
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6 // Faster on mobile
      }
    }
  };

  // Simplified letter animation for mobile
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 10 : 20, // Reduced movement on mobile
    },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * (isMobile ? 0.05 : 0.1), // Faster on mobile
        duration: isMobile ? 0.3 : 0.5
      }
    })
  };

  // Split text into letters for animating each character
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className={char === " " ? "inline-block mr-1 sm:mr-2" : "inline-block"}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-4 bg-gradient-to-b from-primary via-primary to-tertiary relative overflow-hidden">
      {/* Simplified background animation for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && (
          <>
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-secondary/3 sm:bg-secondary/5 rounded-full blur-3xl -top-36 sm:-top-48 -left-36 sm:-left-48 animate-float"></div>
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-accent/3 sm:bg-accent/5 rounded-full blur-3xl -bottom-36 sm:-bottom-48 -right-36 sm:-right-48 animate-float" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        
        {/* Simplified animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 opacity-5 sm:opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ 
            duration: isMobile ? 30 : 20, // Slower on mobile for better performance
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, #38BDF8 0%, transparent 30%), radial-gradient(circle at 70% 70%, #F472B6 0%, transparent 30%)',
            backgroundSize: '100% 100%',
            filter: isMobile ? 'blur(60px)' : 'blur(100px)' // Reduced blur on mobile
          }}
        />
      </div>

      <motion.div
        className="container mx-auto relative z-10 text-center sm:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-secondary font-mono mb-4 sm:mb-5 text-base sm:text-lg flex items-center justify-center sm:justify-start"
        >
          <motion.div
            animate={{ 
              rotate: [0, 20, 0, -20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="inline-block mr-2"
          >
            👋
          </motion.div>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden whitespace-nowrap"
          >
            Hi there! I'm
          </motion.span>
        </motion.div>

        {/* Responsive animated name with typing effect */}
        <div className="flex items-end mb-4 sm:mb-6 justify-center sm:justify-start">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-textPrimary relative group"
          >
            {nameText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index <= charIndex ? 1 : 0, 
                  y: index <= charIndex ? 0 : 20
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="text-secondary inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: charIndex >= nameText.length - 1 ? 1 : 0,
                scale: charIndex >= nameText.length - 1 ? [1, 1.2, 1] : 0
              }}
              transition={{ 
                duration: 0.5,
                repeat: charIndex >= nameText.length - 1 ? 1 : 0
              }}
            >
              .
            </motion.span>
          </motion.h1>
          
          {/* Responsive blinking cursor */}
          <motion.div
            className="w-0.5 sm:w-1 h-8 sm:h-12 md:h-14 lg:h-16 bg-secondary mb-1 ml-1"
            animate={{ 
              opacity: charIndex < nameText.length - 1 ? [1, 0] : 0 
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-secondary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: charIndex >= nameText.length - 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Responsive subtitle */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-textSecondary mb-4 sm:mb-6"
        >
          <span className="inline-block">
            {splitText("I craft digital experiences.")}
          </span>
        </motion.h2>

        {/* Responsive description */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base sm:text-lg text-textSecondary mb-8 sm:mb-12 leading-relaxed mx-auto sm:mx-0"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            I'm a passionate full-stack developer specializing in the MERN stack. 
            I create seamless user experiences and robust applications that make a difference.
          </motion.span>
        </motion.p>

        {/* Responsive action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start justify-center sm:justify-start"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/projects"
              className="btn-primary w-full sm:w-auto text-center px-6 py-3 text-sm sm:text-base"
            >
              View My Work
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="px-6 py-3 border border-textSecondary text-textSecondary rounded hover:bg-textSecondary/10 transition-colors duration-300 font-mono w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Social links with responsive sizing */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center sm:justify-start space-x-6 mt-8 sm:mt-12"
        >
          {[
            { icon: FiGithub, href: "https://github.com/Paresh09pat", label: "GitHub" },
            { icon: FiLinkedin, href: "https://www.linkedin.com/in/paresh-patil-154070217/", label: "LinkedIn" },
            { icon: FiTwitter, href: "#", label: "Twitter" }
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textSecondary hover:text-secondary transition-colors duration-300 p-2 rounded-lg hover:bg-secondary/10"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={isMobile ? 20 : 24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator - hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-textSecondary"
            >
              <FiArrowDown size={24} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero; 