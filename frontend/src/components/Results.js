import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaRedo, FaBrain } from 'react-icons/fa';
import '../styles/Results.css';

const Results = ({ prediction, uploadedImage, onReset }) => {
  const getResultIcon = (predictionType) => {
    switch (predictionType.toLowerCase()) {
      case 'no tumor':
        return <FaCheckCircle className="result-icon success" />;
      default:
        return <FaExclamationTriangle className="result-icon warning" />;
    }
  };

  const getResultMessage = (predictionType) => {
    const messages = {
      'no tumor': 'Great news! No tumor detected in the MRI scan.',
      'glioma': 'Glioma detected. Please consult with a medical professional.',
      'meningioma': 'Meningioma detected. Please consult with a medical professional.',
      'pituitary': 'Pituitary tumor detected. Please consult with a medical professional.'
    };
    return messages[predictionType.toLowerCase()] || 'Analysis complete. Please consult with a medical professional.';
  };

  const confidenceColor = prediction.confidence > 0.9 ? '#10b981' : 
                         prediction.confidence > 0.7 ? '#f59e0b' : '#ef4444';

  return (
    <motion.section 
      className="results-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div
          className="results-container"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="results-header">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <FaBrain className="brain-icon" />
            </motion.div>
            <h2>Analysis Complete</h2>
          </div>

          <div className="results-content">
            <div className="image-result">
              <motion.div 
                className="analyzed-image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img src={uploadedImage} alt="Analyzed MRI" />
                <div className="image-overlay">
                  <span>Analyzed</span>
                </div>
              </motion.div>
            </div>

            <div className="prediction-result">
              <motion.div
                className="result-card"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="result-header">
                  {getResultIcon(prediction.prediction)}
                  <div>
                    <h3 
                      className="prediction-text"
                      style={{ color: prediction.color }}
                    >
                      {prediction.prediction}
                    </h3>
                    <p className="result-message">
                      {getResultMessage(prediction.prediction)}
                    </p>
                  </div>
                </div>

                <motion.div 
                  className="confidence-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="confidence-label">
                    <span>Confidence Level</span>
                    <span className="confidence-value">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="confidence-bar">
                    <motion.div 
                      className="confidence-fill"
                      style={{ backgroundColor: confidenceColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence * 100}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="disclaimer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p>
                    <strong>⚠️ Medical Disclaimer:</strong> This AI analysis is for educational 
                    and research purposes only. Always consult qualified healthcare 
                    professionals for medical diagnosis and treatment decisions.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="results-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              className="new-analysis-button"
              onClick={onReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo />
              Analyze Another Image
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Results;