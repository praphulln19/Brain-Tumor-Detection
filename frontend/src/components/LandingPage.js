import React from 'react';
import { FaBrain, FaSearch } from 'react-icons/fa';

const LandingPage = ({ onStartDetection }) => {
  return (
    <div className="min-h-screen bg-blue-600" style={{ backgroundColor: '#0066ff' }}>
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <FaBrain className="text-blue-600 text-2xl" />
            </div>
            <span className="text-white text-xl font-bold">BrainAI</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-blue-200 transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-blue-200 transition-colors font-medium">
              About
            </a>
            <a href="#tumor-detection" className="text-white hover:text-blue-200 transition-colors font-medium">
              Tumor Detection
            </a>
            <a href="#doctors" className="text-white hover:text-blue-200 transition-colors font-medium">
              Doctors
            </a>
            <a href="#contact" className="text-white hover:text-blue-200 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="bg-white text-gray-800 placeholder-gray-500 rounded-full px-4 py-2 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="text-white text-6xl lg:text-7xl font-extrabold leading-tight">
                BRAIN TUMOR
                <br />
                DETECTION
              </h1>
              
              <p className="text-white text-lg lg:text-xl leading-relaxed font-medium max-w-xl">
                A Brain Tumor Diagnosis Can Be A Daunting Experience. 
                That's Why We're Here To Provide You With Accurate 
                Information And The Resources You Need To Make 
                Informed Decisions About Your Health.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onStartDetection}
                  className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors text-lg transform hover:scale-105"
                >
                  Start Detection
                </button>
                <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Column - Brain Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
                {/* Brain SVG Illustration */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Brain outline */}
                  <path
                    d="M200 50 C250 50, 300 80, 320 130 C340 180, 320 230, 300 260 C280 290, 240 310, 200 320 C160 310, 120 290, 100 260 C80 230, 60 180, 80 130 C100 80, 150 50, 200 50 Z"
                    fill="rgba(255,255,255,0.1)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  
                  {/* Brain details - left hemisphere */}
                  <path
                    d="M120 120 C140 110, 160 115, 180 125 C185 140, 175 155, 165 170 C150 180, 130 175, 115 165 C105 150, 110 135, 120 120 Z"
                    fill="rgba(255,255,255,0.15)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />
                  
                  {/* Brain details - right hemisphere */}
                  <path
                    d="M220 125 C240 115, 260 110, 280 120 C290 135, 285 150, 275 165 C260 175, 240 180, 225 170 C215 155, 205 140, 220 125 Z"
                    fill="rgba(255,255,255,0.15)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />
                  
                  {/* Tumor highlight - glowing red area */}
                  <circle
                    cx="250"
                    cy="160"
                    r="25"
                    fill="rgba(255,100,100,0.7)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="250"
                    cy="160"
                    r="35"
                    fill="none"
                    stroke="rgba(255,100,100,0.5)"
                    strokeWidth="2"
                    className="animate-ping"
                  />
                  
                  {/* Neural pathways */}
                  <path
                    d="M150 200 Q200 190 250 200 Q280 210 300 230"
                    fill="none"
                    stroke="rgba(100,200,255,0.6)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  <path
                    d="M120 180 Q160 170 200 180 Q240 190 270 200"
                    fill="none"
                    stroke="rgba(100,200,255,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                </svg>
                
                {/* Floating elements for visual enhancement */}
                <div className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full opacity-70 animate-bounce"></div>
                <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 left-5 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2870+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Scans Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">&lt;3s</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;