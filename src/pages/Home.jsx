import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const techStackRef = useRef(null);
  const isInView = useInView(techStackRef, { once: false, amount: 0.3 });

  // Tech stack with logos
  const techStack = [
    { name: "MongoDB", color: "#4DB33D", icon: "M" },
    { name: "Express", color: "#000000", icon: "E" },
    { name: "React", color: "#61DAFB", icon: "R" },
    { name: "Node.js", color: "#339933", icon: "N" },
  ];

  // Optimized parallax effect - only use if not on mobile for better performance
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]); // Reduced parallax intensity
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);  // Reduced parallax intensity
  const opacity = useTransform(scrollY, [0, 100, 400], [1, 0.9, 0.7]); // Less aggressive opacity change

  // Track mouse position for custom cursor (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Only add mouse tracking on desktop
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Reduced loading time

    return () => {
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(timer);
    };
  }, []);

  // Text reveal animation for tech keywords
  const keywords = [
    "Full-Stack",
    "Responsive",
    "Interactive",
    "Animated",
    "Performant",
  ];
  const [currentKeyword, setCurrentKeyword] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Check if device is mobile for performance optimizations
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Loading animation */}
      <AnimatePresence>
        {!isLoaded && <Loader text="Welcome" />}
      </AnimatePresence>

      {/* Custom cursor effect - desktop only */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 rounded-full bg-secondary/20 backdrop-blur-sm pointer-events-none z-50 border border-secondary/50 hidden md:block"
          style={{
            x: cursorPosition.x - 12,
            y: cursorPosition.y - 12,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}

      {/* Main content with optimized parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Simplified animated background shapes - fewer shapes for better performance */}
        {!isMobile && Array(3) // Reduced from 6 to 3 shapes
          .fill()
          .map((_, index) => {
            const size = Math.random() * 200 + 100; // Smaller sizes
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            const duration = Math.random() * 30 + 20; // Slower animations
            const delay = Math.random() * 5;

            return (
              <motion.div
                key={index}
                className="absolute rounded-full bg-gradient-to-r from-secondary/3 to-accent/3 blur-2xl" // Reduced opacity and blur
                style={{
                  width: size,
                  height: size,
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                }}
                animate={{
                  x: [0, 20, -10, 5, 0], // Reduced movement range
                  y: [0, -20, 10, -5, 0], // Reduced movement range
                  opacity: [0.2, 0.3, 0.1, 0.4, 0.2], // Lower opacity values
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: delay,
                }}
              />
            );
          })}

        {/* Hero section with conditional parallax */}
        <motion.div style={isMobile ? {} : { opacity, y: y1 }}>
          <Hero />
        </motion.div>

        {/* Simplified skills ticker */}
        <div className="relative py-8 sm:py-10 bg-tertiary/30 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-tertiary/10" />
          <motion.div
            className="whitespace-nowrap flex"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isMobile ? 20 : 15, // Slower on mobile
                ease: "linear",
              },
            }}
          >
            {Array(isMobile ? 5 : 8) // Fewer repetitions on mobile
              .fill([
                "React",
                "MongoDB",
                "Express",
                "Node.js",
                "Redux",
                "Framer Motion",
                "JavaScript",
                "Bootstrap",
                "Tailwind CSS",
                "RESTful APIs",
                "Git",
                "CI/CD",
                "Responsive Design",
              ])
              .flat()
              .map((skill, i) => (
                <span
                  key={i}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold px-3 sm:px-4 inline-block text-tertiary"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                    {skill}
                  </span>
                  <span className="text-secondary mx-2 sm:mx-4">•</span>
                </span>
              ))}
          </motion.div>
        </div>

        {/* Tech stack section with conditional parallax */}
        <motion.section
          ref={techStackRef}
          className="py-16 sm:py-24 lg:py-32 px-4 relative z-10"
          style={isMobile ? {} : { y: y2 }}
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              I craft with{" "}
              <motion.span
                key={currentKeyword}
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.5 }}
                className="text-secondary inline-block"
              >
                {keywords[currentKeyword]}
              </motion.span>{" "}
              technologies
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-textSecondary text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Leveraging the power of modern web technologies to build scalable,
              user-centric applications that deliver exceptional experiences.
            </motion.p>

            {/* Simplified MERN stack showcase */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative bg-tertiary/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Tech icon */}
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl text-primary shadow-lg"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.icon}
                  </div>

                  {/* Tech name */}
                  <h3 className="text-center font-semibold text-textPrimary mb-2 text-sm sm:text-base">
                    {tech.name}
                  </h3>

                  {/* Simplified hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${tech.color}, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA section */}
            <motion.div
              className="text-center mt-12 sm:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-secondary/10 border border-secondary text-secondary rounded-lg hover:bg-secondary/20 transition-all duration-300 font-medium text-sm sm:text-base"
              >
                Explore My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Home;
