import { motion } from 'framer-motion';
import Experience from '../components/Experience';

const ExperiencePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Experience />
    </motion.div>
  );
};

export default ExperiencePage; 