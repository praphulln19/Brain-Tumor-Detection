import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <div className="nav">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBrain className="logo-icon" />
            <span>BrainAI</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1>Brain Tumor Detection</h1>
          <p>Advanced AI-powered analysis of MRI scans for early tumor detection</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">&lt;3s</span>
              <span className="stat-label">Analysis Time</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="header-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
    </motion.header>
  );
};

export default Header;