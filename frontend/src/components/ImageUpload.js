import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaImage, FaSpinner, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../styles/ImageUpload.css';

const ImageUpload = ({ onPrediction, isLoading, setIsLoading }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setError(null);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDropRejected: (fileRejections) => {
      setError('Please upload a valid image file (max 10MB)');
    }
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Replace with your backend endpoint
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Simulate different prediction results
      const mockResults = [
        { prediction: 'No Tumor', confidence: 0.95, color: '#10b981' },
        { prediction: 'Glioma', confidence: 0.87, color: '#ef4444' },
        { prediction: 'Meningioma', confidence: 0.91, color: '#f59e0b' },
        { prediction: 'Pituitary', confidence: 0.89, color: '#8b5cf6' }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      
      setTimeout(() => {
        onPrediction(randomResult, previewUrl);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      setError('Failed to analyze image. Please try again.');
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <motion.section 
      className="upload-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload MRI Scan
        </motion.h2>

        <div className="upload-container">
          <AnimatePresence mode="wait">
            {!previewUrl ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  {...getRootProps()}
                  className={`dropzone ${isDragActive ? 'active' : ''}`}
                >
                  <input {...getInputProps()} />
                  <motion.div 
                    className="dropzone-content"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaUpload className="upload-icon" />
                    <h3>
                      {isDragActive 
                        ? 'Drop the MRI scan here' 
                        : 'Upload MRI Scan'
                      }
                    </h3>
                    <p>Drag & drop an image here, or click to select</p>
                    <span className="file-types">Supports: JPEG, PNG, GIF (max 10MB)</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="preview-container"
              >
                <div className="image-preview">
                  <motion.button
                    className="clear-button"
                    onClick={clearImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </motion.button>
                  <img src={previewUrl} alt="Uploaded MRI" />
                </div>
                
                <div className="preview-info">
                  <div className="file-info">
                    <FaImage className="file-icon" />
                    <div>
                      <h4>{uploadedFile.name}</h4>
                      <p>{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  <motion.button
                    className="analyze-button"
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="spinner" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze MRI Scan'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ImageUpload;