import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import Features from './components/Features';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handlePrediction = (result, image) => {
    setPrediction(result);
    setUploadedImage(image);
  };

  const handleReset = () => {
    setPrediction(null);
    setUploadedImage(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Header />
        
        <main className="main-content">
          {!prediction ? (
            <>
              <ImageUpload 
                onPrediction={handlePrediction}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <Features />
            </>
          ) : (
            <Results 
              prediction={prediction}
              uploadedImage={uploadedImage}
              onReset={handleReset}
            />
          )}
        </main>

        <Footer />
      </motion.div>
    </div>
  );
}

export default App;