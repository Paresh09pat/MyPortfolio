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

  // Project item animation
  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-primary relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-heading mb-12">
            <motion.span 
              className="text-secondary font-mono mr-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
            </motion.span> 
            <span className="inline-block">
              {splitText("Some Things I've Built")}
            </span>
          </h2>

          <div className="grid gap-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={projectVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? 'md:text-left' : 'md:text-right md:flex-row-reverse'
                }`}
              >
                {/* Project Image with simplified hover effect */}
                <div className="relative group overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-secondary/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden bg-tertiary border border-secondary/30 shadow-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-tertiary/80 flex items-center justify-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* <span className="text-secondary font-mono">
                        Project Screenshot
                      </span> */}
                    </motion.div>
                  </div>
                </div>

                {/* Project Info with simplified animations */}
                <div className={`${index % 2 === 1 ? 'md:order-first' : ''}`}>
                  <motion.p 
                    className="font-mono text-secondary mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    Featured Project
                  </motion.p>
                  <motion.h3 
                    className="text-2xl font-bold text-textPrimary mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="bg-tertiary/80 p-6 rounded-lg shadow-md mb-4 border border-tertiary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ 
                      boxShadow: "0 4px 20px rgba(56, 189, 248, 0.2)",
                      borderColor: "rgba(56, 189, 248, 0.3)"
                    }}
                  >
                    <p className="text-textPrimary">{project.description}</p>
                  </motion.div>

                  <motion.ul 
                    className={`flex flex-wrap gap-3 mb-4 ${
                      index % 2 === 1 ? 'md:justify-end' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.li 
                        key={tech} 
                        className="font-mono text-sm text-textSecondary bg-tertiary/50 px-3 py-1 rounded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: index * 0.05 + techIndex * 0.05 + 0.3 }}
                        whileHover={{
                          backgroundColor: "rgba(56, 189, 248, 0.1)",
                          color: "#E2E8F0"
                        }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div 
                    className={`flex gap-6 ${
                      index % 2 === 1 ? 'md:justify-end' : ''
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {/* <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-secondary transition-colors duration-300 p-2"
                      whileHover={{ y: -2 }}
                    >
                      <FiGithub size={20} />
                    </motion.a> */}
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-secondary transition-colors duration-300 p-2"
                      whileHover={{ y: -2 }}
                    >
                      <FiExternalLink size={20} />
                    </motion.a>
                  </motion.div>
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