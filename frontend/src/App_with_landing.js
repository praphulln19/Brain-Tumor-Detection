import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import Features from './components/Features';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'detection'
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

  const switchToDetection = () => {
    setCurrentView('detection');
  };

  const switchToLanding = () => {
    setCurrentView('landing');
    handleReset();
  };

  if (currentView === 'landing') {
    return (
      <div className="App">
        <LandingPage onStartDetection={switchToDetection} />
      </div>
    );
  }

  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Header onBackToLanding={switchToLanding} />
        
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