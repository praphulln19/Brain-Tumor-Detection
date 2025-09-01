import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaChartLine, FaClock } from 'react-icons/fa';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaRocket />,
      title: 'Advanced AI',
      description: 'State-of-the-art deep learning models trained on thousands of MRI scans',
      color: '#3b82f6'
    },
    {
      icon: <FaClock />,
      title: 'Fast Analysis',
      description: 'Get results in seconds with our optimized neural network architecture',
      color: '#10b981'
    },
    {
      icon: <FaChartLine />,
      title: 'High Accuracy',
      description: '95%+ accuracy rate in detecting and classifying brain tumors',
      color: '#f59e0b'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Privacy First',
      description: 'Your medical images are processed locally and never stored permanently',
      color: '#8b5cf6'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="features-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Why Choose Our AI Platform?</h2>
          <p>Cutting-edge technology meets medical expertise for reliable brain tumor detection</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="feature-icon"
                style={{ backgroundColor: feature.color + '20', color: feature.color }}
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-number">2,870+</span>
              <span className="stat-label">Training Images</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-number">95%</span>
              <span className="stat-label">Accuracy Rate</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-number">4</span>
              <span className="stat-label">Tumor Types</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-number">&lt;3s</span>
              <span className="stat-label">Analysis Time</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;