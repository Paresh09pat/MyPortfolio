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

  // For parallax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 100, 400], [1, 0.8, 0]);

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

  return (
    <>
      {/* Loading animation */}
      <AnimatePresence>
        {!isLoaded && <Loader text="Welcome" />}
      </AnimatePresence>

      {/* Custom cursor effect */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-secondary/20 backdrop-blur-sm pointer-events-none z-50 border border-secondary/50 hidden md:block"
        style={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main content with parallax effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Animated background shapes */}
        {Array(6)
          .fill()
          .map((_, index) => {
            const size = Math.random() * 300 + 100;
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            return (
              <motion.div
                key={index}
                className="absolute rounded-full bg-gradient-to-r from-secondary/5 to-accent/5 blur-3xl"
                style={{
                  width: size,
                  height: size,
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                }}
                animate={{
                  x: [0, 30, -20, 10, 0],
                  y: [0, -40, 20, -10, 0],
                  rotate: [0, 90, 180, 270, 360],
                  opacity: [0.3, 0.4, 0.2, 0.5, 0.3],
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

        {/* Hero section with motion parallax */}
        <motion.div style={{ opacity, y: y1 }}>
          <Hero />
        </motion.div>

        {/* Animated skills ticker */}
        <div className="relative py-10 bg-tertiary/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-tertiary/20" />
          <motion.div
            className="whitespace-nowrap flex"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
          >
            {Array(10)
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
                  className="text-4xl font-bold px-4 inline-block text-tertiary"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                    {skill}
                  </span>
                  <span className="text-secondary mx-4">•</span>
                </span>
              ))}
          </motion.div>
        </div>

        {/* Tech stack section that appears after scrolling */}
        <motion.section
          ref={techStackRef}
          className="py-32 px-4 relative z-10"
          style={{ y: y2 }}
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-textPrimary text-center mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              My MERN Stack
            </motion.h2>

            <motion.p
              className="text-center text-xl text-textSecondary mb-16 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 12, delay: 0.1 }}
            >
              Creating{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentKeyword}
                  className="text-secondary font-bold inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {keywords[currentKeyword]}
                </motion.span>
              </AnimatePresence>{" "}
              web experiences with modern technologies
            </motion.p>

            {/* Tech cards with simpler hover effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="relative group"
                  initial={{ y: 50, opacity: 0 }}
                  animate={
                    isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                  }
                  transition={{
                    type: "spring",
                    damping: 12,
                    delay: index * 0.1 + 0.2,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-tertiary rounded-xl overflow-hidden p-6 md:p-8 h-40 md:h-48 flex flex-col justify-center items-center relative z-10 border border-secondary/10">
                    <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center">
                      <span
                        className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </span>
                      <h3 className="text-textPrimary text-lg md:text-xl font-mono">
                        {tech.name}
                      </h3>
                    </div>

                    {/* Simpler background effect on hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Simplified border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "0 0 0 1px rgba(56, 189, 248, 0.3)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA button with simpler hover effect */}
          <div className="text-center mt-16">
            <Link to="/experience">
              <motion.a
                className="inline-block px-8 py-3 bg-tertiary border border-secondary text-secondary rounded-lg font-mono overflow-hidden relative group"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(56, 189, 248, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-textPrimary transition-colors duration-300">
                  Explore My Work
                </span>
              </motion.a>
            </Link>
          </div>
        </motion.section>

        {/* Dynamic grid lines in background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute w-full h-px bg-secondary/5 top-1/4" />
          <div className="absolute w-full h-px bg-secondary/5 top-2/4" />
          <div className="absolute w-full h-px bg-secondary/5 top-3/4" />
          <div className="absolute h-full w-px bg-secondary/5 left-1/4" />
          <div className="absolute h-full w-px bg-secondary/5 left-2/4" />
          <div className="absolute h-full w-px bg-secondary/5 left-3/4" />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
