import React, { useState, useEffect } from 'react';
import { ChefHat, MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { NavLink } from "react-router-dom";
import './onboarding.css';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onboardingSteps = [
    {
      icon: <ChefHat className="feature-icon" size={48} />,
      title: "Fresh & Delicious",
      description: "Experience authentic flavors crafted by our expert chefs using the finest ingredients"
    },
    {
      icon: <MapPin className="feature-icon" size={48} />,
      title: "Easy Table Booking",
      description: "Reserve your perfect table in seconds with our seamless booking system"
    },
    {
      icon: <Clock className="feature-icon" size={48} />,
      title: "Quick Service",
      description: "Fast ordering and delivery to make your dining experience smooth and enjoyable"
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`onboarding-container ${isVisible ? 'visible' : ''}`}>
      {/* Header with Logo */}
      <header className="onboarding-header">
        <div className="logo-container">
          <div className="logo">
            <ChefHat size={32} color="#d9b550" />
          </div>
          <div className="brand-info">
            <h1 className="brand-name">Savory<span className="highlight">Spot</span></h1>
            <p className="tagline">Your Culinary Journey Begins</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="onboarding-main">
        <div className="step-container">
          <div className="step-content">
            <div className="icon-container">
              {onboardingSteps[currentStep].icon}
            </div>
            <h2 className="step-title">{onboardingSteps[currentStep].title}</h2>
            <p className="step-description">{onboardingSteps[currentStep].description}</p>
          </div>

          {/* Step Indicators */}
          <div className="step-indicators">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="step-navigation">
            <button
              className={`nav-button secondary ${currentStep === 0 ? 'hidden' : ''}`}
              onClick={prevStep}
            >
              Previous
            </button>

            {currentStep < onboardingSteps.length - 1 ? (
              <button className="nav-button primary" onClick={nextStep}>
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <NavLink to="/" className="nav-button primary get-started">
                Get Started
                <ArrowRight size={20} />
              </NavLink>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="onboarding-footer">
        <div className="restaurant-info">
          <div className="info-item">
            <MapPin size={16} />
            <span>Downtown Food District</span>
          </div>
          <div className="info-item">
            <Clock size={16} />
            <span>Open 11AM - 11PM</span>
          </div>
          <div className="info-item">
            <Star size={16} fill="#d9b550" color="#d9b550" />
            <span>4.8 Rating</span>
          </div>
        </div>
        <p className="copyright">© 2025 SavorySpot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OnboardingPage;