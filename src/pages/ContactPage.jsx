import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Contact />
    </motion.div>
  );
};

export default ContactPage; 