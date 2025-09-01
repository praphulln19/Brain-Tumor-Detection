import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBrain } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="footer-logo">
            <FaBrain className="logo-icon" />
            <span>BrainAI</span>
          </div>
          
          <p className="footer-text">
            Made with <FaHeart className="heart-icon" /> for advancing healthcare through AI
          </p>
          
          <div className="footer-disclaimer">
            <p>
              <strong>Medical Disclaimer:</strong> This application is designed for educational 
              and research purposes only. It should not be used as a substitute for professional 
              medical advice, diagnosis, or treatment. Always seek the advice of qualified 
              healthcare providers with any questions regarding medical conditions.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Brain Tumor Detection AI. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;