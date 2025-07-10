import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  const isInView = useInView(projectsRef, { once: false, amount: 0.2 });

  const projects = [
    {
      title: 'Portfolio Project',
      description: 'A full-stack portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js). It showcases personal projects, skills, experience, and includes a dynamic contact form powered by EmailJS. The site features a responsive design.',
      tech: ['React','Framer Motion','Tailwind CSS','EmailJS','Javascript'],
      github: '#',
      live: 'https://paresh-port-folio.netlify.app/',
      image: '/portfolio.png'
    },
    {
      title: 'AINET Website',
      description: 'This is an project for Indian English Teacher Society, I have created this website for them to showcase their work and services. Also them upcoming events and news.',
      tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Javascript'],
      github: '#',
      live: 'https://theainet.net/',
      image: '/ainet.png'
    },

    {
      title: 'Infinity Cans',
      description: 'This is a website built with HTML, CSS,Javascript, React, Node.js. It is developed for a client who wants to sell digital printed cans online.',
      tech: ['HTML', 'CSS', 'React', 'Node.js','Javascript'],
      github: 'https://github.com/Paresh09pat/Inifinity',
      live: 'https://infinity-cans.netlify.app/',
      image: '/Infinity.png'
    },
    {
      title: 'Ecommerce Website',
      description: 'A ecommerce website built with React, Node.js, Express, and MongoDB. It allows users to create, read, update, and delete products.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB','Javascript'],
      github: 'https://github.com/Paresh09pat/EcomClothes',
      live: 'https://clothe-ecom.netlify.app/',
      image: '/Ecom.png'
    },
    {
      title: 'React Blog Project',
      description: 'This is a blog project built with React, Node.js, Express, and MongoDB. It allows users to create, read, update, and delete blog posts. ',
      tech: ['React', 'Node.js', 'Express', 'MongoDB','Javascript'],
      github: '#',
      live: 'https://paresh-blog-project.netlify.app/',
      image: '/blog.png'
    },
  ];

  // Simplified letter animation for better mobile performance
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03, // Reduced delay for faster animation
        duration: 0.3 // Shorter duration
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
        className={char === " " ? "inline-block mr-1 sm:mr-2" : "inline-block"}
      >
        {char}
      </motion.span>
    ));
  };

  // Simplified project item animation for better mobile performance
  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-primary relative overflow-hidden">
      {/* Simplified background animation for mobile performance */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5 sm:opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ 
            duration: 30, // Slower animation for better performance
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, #38BDF8 0%, transparent 30%), radial-gradient(circle at 70% 70%, #F472B6 0%, transparent 30%)',
            backgroundSize: '100% 100%',
            filter: 'blur(60px)' // Reduced blur for better performance
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="section-heading mb-8 sm:mb-12">
            <motion.span 
              className="text-secondary font-mono mr-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
            </motion.span> 
            <span className="inline-block text-2xl sm:text-3xl">
              {splitText("Some Things I've Built")}
            </span>
          </h2>

          {/* Improved mobile-first grid layout */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={projectVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
                className="relative"
              >
                {/* Mobile-first layout - single column by default */}
                <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 lg:items-center">
                  
                  {/* Project Image - always first on mobile */}
                  <div className={`relative group overflow-hidden order-1 ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden bg-tertiary border border-secondary/30 shadow-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy" // Added lazy loading for better performance
                      />
                      <motion.div 
                        className="absolute inset-0 bg-tertiary/60 flex items-center justify-center lg:bg-tertiary/80"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Project Info - always second on mobile, responsive text alignment */}
                  <div className={`order-2 ${
                    index % 2 === 1 ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'
                  }`}>
                    <motion.p 
                      className="font-mono text-secondary mb-2 text-sm sm:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      Featured Project
                    </motion.p>
                    <motion.h3 
                      className="text-xl sm:text-2xl font-bold text-textPrimary mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.div 
                      className="bg-tertiary/80 p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-tertiary hover:border-secondary/30 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <p className="text-textPrimary text-sm sm:text-base leading-relaxed">{project.description}</p>
                    </motion.div>

                    {/* Responsive tech stack */}
                    <motion.ul 
                      className={`flex flex-wrap gap-2 sm:gap-3 mb-4 ${
                        index % 2 === 1 ? 'lg:justify-end' : ''
                      }`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.tech.map((tech, techIndex) => (
                        <motion.li 
                          key={tech} 
                          className="font-mono text-xs sm:text-sm text-textSecondary bg-tertiary/50 px-2 sm:px-3 py-1 rounded hover:bg-secondary/10 hover:text-textPrimary transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ delay: index * 0.05 + techIndex * 0.03 + 0.3 }}
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Project links with better touch targets for mobile */}
                    <motion.div 
                      className={`flex gap-4 sm:gap-6 ${
                        index % 2 === 1 ? 'lg:justify-end' : ''
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-textSecondary hover:text-secondary transition-colors duration-300 p-3 hover:bg-secondary/10 rounded-lg" // Better touch target
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }} // Added tap animation for mobile
                        aria-label={`View ${project.title} live site`}
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 