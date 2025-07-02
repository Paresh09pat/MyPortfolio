import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [charIndex, setCharIndex] = useState(-1);
  const nameText = "Paresh";
  
  // For text typing effect
  useEffect(() => {
    if (charIndex < nameText.length - 1) {
      const timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [charIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Letter animation for the heading
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1
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
        className={char === " " ? "inline-block mr-2" : "inline-block"}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-primary via-primary to-tertiary relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Added animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, #38BDF8 0%, transparent 30%), radial-gradient(circle at 70% 70%, #F472B6 0%, transparent 30%)',
            backgroundSize: '100% 100%',
            filter: 'blur(100px)'
          }}
        />
      </div>

      <motion.div
        className="container mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-secondary font-mono mb-5 text-lg flex items-center"
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

        {/* Animated name with typing effect */}
        <div className="flex items-end mb-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-textPrimary relative group"
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
          
          {/* Blinking cursor that disappears after typing is complete */}
          <motion.div
            className="w-1 h-12 md:h-16 bg-secondary mb-1 ml-1"
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

        <motion.h2
          className="text-4xl md:text-6xl font-bold text-textSecondary mb-6"
        >
          {splitText("I craft digital experiences.")}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-lg text-textSecondary mb-12 leading-relaxed"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            A passionate{" "}
            <motion.span
              className="text-secondary font-semibold"
              animate={{ 
                color: ["#38BDF8", "#F472B6", "#38BDF8"],
                textShadow: [
                  "0 0 5px rgba(56, 189, 248, 0)",
                  "0 0 10px rgba(56, 189, 248, 0.5)",
                  "0 0 5px rgba(56, 189, 248, 0)"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              MERN Stack Developer
            </motion.span>{" "}
            with 3 years of experience in building
            exceptional digital experiences. I specialize in creating innovative web solutions
            that combine beautiful design with powerful functionality.
          </motion.span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/projects"
              className="px-8 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-secondary/30 block"
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
              className="px-8 py-3 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/10 transition-all duration-300 block"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="fixed left-10 bottom-0 hidden lg:block"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.a
              href="https://github.com/Paresh09pat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textSecondary hover:text-secondary hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FiGithub size={22} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/paresh-patil-6bb7231a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textSecondary hover:text-secondary hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FiLinkedin size={22} />
            </motion.a>
            <motion.a
              href="https://x.com/paresh_balu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textSecondary hover:text-secondary hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FiTwitter size={22} />
            </motion.a>
            <div className="h-24 w-px bg-textSecondary/20"></div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="fixed right-10 bottom-0 hidden lg:block"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.a
              href="mailto:09patilparesh@gmail.com"
              className="text-textSecondary hover:text-secondary font-mono tracking-widest hover:-translate-y-1 transition-all duration-300"
              style={{ writingMode: 'vertical-rl' }}
              whileHover={{
                textShadow: "0 0 8px rgba(56, 189, 248, 0.7)"
              }}
            >
              09patilparesh@gmail.com
            </motion.a>
            <div className="h-24 w-px bg-textSecondary/20"></div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="text-textSecondary text-sm font-mono">Scroll Down</span>
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            <FiArrowDown className="text-secondary" size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 