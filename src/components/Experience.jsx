import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [activeIndex, setActiveIndex] = useState(null);
  const experienceRef = useRef(null);
  const isInView = useInView(experienceRef, { once: false, amount: 0.2 });

  const workExperience = [
    {
      title: 'Web Developer',
      company: 'Covance Softsol India, Hydrabad',
      duration: 'Feb 2025 - Jun 2025',
      points: [
        'Led a team of 5 developers in building a scalable Web platform using MERN stack',
        'Improved application performance by 40% through code optimization and caching strategies',
        'Implemented CI/CD pipelines using GitHub Actions and AWS',
        'Mentored junior developers and conducted code reviews',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Redphantom Tech Novelty, Pune',
      duration: 'May 2023 - Jan 2025',
      points: [
        'Developed and maintained multiple client projects using React and Node.js',
        'Integrated third-party APIs and payment gateways',
        'Implemented responsive designs and cross-browser compatibility',
        'Collaborated with UX designers to implement pixel-perfect designs',
      ],
    },
    {
      title: 'Trainee',
      company: 'Prepbytes, Gurugram',
      duration: 'Jun 2022 - Apr 2023',
      points: [
        'Built and maintained client websites using HTML, CSS, and JavaScript',
        'Assisted in database design and implementation using MongoDB',
        'Participated in daily stand-ups and sprint planning meetings',
        'Contributed to the company\'s internal tools development',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor Engineering',
      institution: 'Indira College of Engineering and Management, Pune',
      duration: '2017 - 2020',
      points: [
        'Graduated with First Class Honours',
        'Specialized in Web Technologies and Database Management',
        'Led the University\'s Web Development Club',
        'Completed multiple internships in web development',
      ],
    },
    {
      degree: 'Diploma',
      institution: 'Smt. SSPIT (polytechnic), chopda',
      duration: '2015 - 2017',
      points: [
        'Diploma with First Class Honours',
 
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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

  // Timeline connector animation
  const timelineConnectorVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%',
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary to-tertiary relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
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
        ref={experienceRef}
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
              {splitText("Experience")}
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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-12 space-x-8"
          >
            <motion.button
              onClick={() => setActiveTab('work')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 relative ${
                activeTab === 'work'
                  ? 'bg-secondary text-primary'
                  : 'text-textSecondary hover:text-secondary'
              }`}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeTab !== 'work' ? 'rgba(56, 189, 248, 0.1)' : undefined
              }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab !== 'work' && (
                <motion.span 
                  className="absolute inset-0 bg-secondary/10 rounded-lg"
                  layoutId="tabBackground"
                  transition={{ duration: 0.3 }}
                />
              )}
              <FaBriefcase className="text-xl" />
              <span>Work</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('education')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 relative ${
                activeTab === 'education'
                  ? 'bg-secondary text-primary'
                  : 'text-textSecondary hover:text-secondary'
              }`}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeTab !== 'education' ? 'rgba(56, 189, 248, 0.1)' : undefined
              }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab !== 'education' && (
                <motion.span 
                  className="absolute inset-0 bg-secondary/10 rounded-lg"
                  layoutId="tabBackground"
                  transition={{ duration: 0.3 }}
                />
              )}
              <FaGraduationCap className="text-xl" />
              <span>Education</span>
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {activeTab === 'work' ? (
                <div className="space-y-0">
                  {/* Timeline connector */}
                  <div className="absolute left-[9px] top-0 bottom-0 w-1 bg-tertiary/50 rounded-full overflow-hidden z-0">
                    <motion.div 
                      className="h-full w-full bg-secondary"
                      variants={timelineConnectorVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                  
                  {workExperience.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="pl-10 pb-12 relative"
                      onHoverStart={() => setActiveIndex(index)}
                      onHoverEnd={() => setActiveIndex(null)}
                    >
                      {/* Timeline dot */}
                      <motion.div 
                        className="absolute left-0 top-2 w-5 h-5 rounded-full bg-secondary z-10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </motion.div>

                      <motion.div
                        className="p-6 bg-tertiary/50 rounded-lg relative overflow-hidden backdrop-blur-sm border border-tertiary"
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.2)",
                          borderColor: "rgba(56, 189, 248, 0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <motion.h3 
                                className="text-xl font-bold text-secondary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.1 }}
                              >
                                {exp.title}
                              </motion.h3>
                              <motion.p 
                                className="text-textPrimary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.2 }}
                              >
                                {exp.company}
                              </motion.p>
                            </div>
                            <motion.p 
                              className="text-textSecondary font-mono bg-tertiary/70 px-3 py-1 rounded-md inline-block mt-2 md:mt-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 + 0.3 }}
                            >
                              {exp.duration}
                            </motion.p>
                          </div>
                          <motion.ul 
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                          >
                            {exp.points.map((point, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + i * 0.1 + 0.5 }}
                                className="flex items-start space-x-2 text-textSecondary group"
                              >
                                <span className="text-secondary mt-1.5 group-hover:text-secondary transition-colors">
                                  •
                                </span>
                                <span className="group-hover:text-textPrimary transition-colors duration-300">{point}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-0">
                  {/* Timeline connector */}
                  <div className="absolute left-[9px] top-0 bottom-0 w-1 bg-tertiary/50 rounded-full overflow-hidden z-0">
                    <motion.div 
                      className="h-full w-full bg-secondary"
                      variants={timelineConnectorVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                  
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="pl-10 pb-12 relative"
                      onHoverStart={() => setActiveIndex(index)}
                      onHoverEnd={() => setActiveIndex(null)}
                    >
                      {/* Timeline dot */}
                      <motion.div 
                        className="absolute left-0 top-2 w-5 h-5 rounded-full bg-secondary z-10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </motion.div>

                      <motion.div
                        className="p-6 bg-tertiary/50 rounded-lg relative overflow-hidden backdrop-blur-sm border border-tertiary"
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.2)",
                          borderColor: "rgba(56, 189, 248, 0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <motion.h3 
                                className="text-xl font-bold text-secondary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.1 }}
                              >
                                {edu.degree}
                              </motion.h3>
                              <motion.p 
                                className="text-textPrimary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.2 }}
                              >
                                {edu.institution}
                              </motion.p>
                            </div>
                            <motion.p 
                              className="text-textSecondary font-mono bg-tertiary/70 px-3 py-1 rounded-md inline-block mt-2 md:mt-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 + 0.3 }}
                            >
                              {edu.duration}
                            </motion.p>
                          </div>
                          <motion.ul 
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                          >
                            {edu.points.map((point, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + i * 0.1 + 0.5 }}
                                className="flex items-start space-x-2 text-textSecondary group"
                              >
                                <span className="text-secondary mt-1.5 group-hover:text-secondary transition-colors">
                                  •
                                </span>
                                <span className="group-hover:text-textPrimary transition-colors duration-300">{point}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience; 