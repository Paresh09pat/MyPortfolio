import { motion } from 'framer-motion';

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="w-32 h-32 relative"
          animate={{ 
            rotate: 360 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {["M", "E", "R", "N"].map((letter, i) => (
            <motion.div 
              key={letter}
              className="absolute w-10 h-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              style={{
                top: Math.sin(i * Math.PI / 2) * 50 + 50 - 20,
                left: Math.cos(i * Math.PI / 2) * 50 + 50 - 20,
              }}
            >
              <span className="text-secondary text-2xl font-bold">{letter}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.span 
          className="text-center mt-6 font-mono text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Loader; 