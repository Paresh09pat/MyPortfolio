import { motion } from 'framer-motion';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <Projects />
    </motion.div>
  );
};

export default ProjectsPage; 