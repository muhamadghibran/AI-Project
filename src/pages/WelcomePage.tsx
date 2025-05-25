import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-green-600 mb-4"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0, -5, 0] 
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Flower2 size={64} />
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold text-center text-green-800 mb-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Plant Reminder
      </motion.h1>
      
      <motion.p 
        className="text-xl text-center text-gray-600 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Your weather-based plant care assistant
      </motion.p>
      
      <motion.div 
        className="card max-w-md w-full text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <p className="text-gray-600 mb-6">
          Get personalized care recommendations for your houseplants based on weather conditions. Never forget to water, prune, or fertilize again!
        </p>
        
        <motion.button 
          className="btn-primary w-full mb-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </motion.button>
      </motion.div>
      
      <motion.p 
        className="text-sm text-center text-gray-500 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        A beautiful PWA to keep your plants happy and healthy
      </motion.p>
    </motion.div>
  );
};

export default WelcomePage;