import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaBootstrap } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiHtml5, SiCss3 } from 'react-icons/si';

const About = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: false, amount: 0.2 });

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

  // Text reveal animation for paragraphs
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Letter animation for the heading
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05
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
        animate={isInView ? "visible" : "hidden"}
        className={char === " " ? "inline-block mr-2" : "inline-block"}
      >
        {char}
      </motion.span>
    ));
  };

  const technologies = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tertiary to-primary relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl top-48 -right-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl -bottom-48 -left-48 animate-float" style={{ animationDelay: '2s' }}></div>
        
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
        ref={aboutRef}
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-textPrimary"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block">
              {splitText("About Me")}
            </div>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-secondary mx-auto mb-12 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="w-full h-full bg-secondary"
              animate={{ 
                backgroundImage: ['linear-gradient(90deg, #38BDF8, #F472B6)', 'linear-gradient(90deg, #F472B6, #38BDF8)'] 
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 text-lg text-textSecondary"
            variants={itemVariants}
          >
            <motion.p
              custom={0}
              variants={textRevealVariants}
              className="relative overflow-hidden"
            >
              <motion.span
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block"
              >
                Hello! I'm a passionate MERN Stack Developer with 3 years of experience in crafting
                digital solutions. My journey in web development started with a curiosity about
                how things work on the internet, and it has evolved into a professional career
                building exceptional digital experiences.
              </motion.span>
            </motion.p>
            
            <motion.p
              custom={1}
              variants={textRevealVariants}
              className="relative overflow-hidden"
            >
              <motion.span
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="block"
              >
                I specialize in building modern web applications using the{" "}
                <motion.span
                  className="text-secondary font-semibold"
                  animate={{ 
                    color: ["#38BDF8", "#F472B6", "#38BDF8"]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  MERN stack
                </motion.span>{" "}
                (MongoDB, Express.js, React, and Node.js). My approach combines clean code
                practices with innovative solutions to create scalable and maintainable
                applications.
              </motion.span>
            </motion.p>
            
            <motion.p
              custom={2}
              variants={textRevealVariants}
              className="relative overflow-hidden"
            >
              <motion.span
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="block"
              >
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing my knowledge with the developer community.
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-textPrimary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Technologies I Work With
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-tertiary/50 transition-colors duration-300 border border-transparent"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `rgba(${tech.color.replace('#', '').match(/.{2}/g).map(c => parseInt(c, 16)).join(', ')}, 0.1)`,
                    borderColor: `${tech.color}50`,
                    y: -5
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="mb-2"
                    whileHover={{ y: -2 }}
                  >
                    <tech.icon
                      size={40}
                      className="transition-colors duration-300"
                      style={{ color: tech.color }}
                    />
                  </motion.div>
                  
                  <motion.span 
                    className="text-sm font-medium text-textSecondary relative z-10"
                    whileHover={{
                      color: tech.color
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 