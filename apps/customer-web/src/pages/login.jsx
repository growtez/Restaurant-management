import React, { useState, useEffect } from 'react';
import {  Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { NavLink } from "react-router-dom";
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showEmailSuggestion, setShowEmailSuggestion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
    
    // Show suggestion for gmail completion
    if (value && !value.includes('@') && value.length > 2) {
      setShowEmailSuggestion(true);
    } else {
      setShowEmailSuggestion(false);
    }
  };

  const handleEmailSuggestion = () => {
    if (!email.includes('@')) {
      setEmail(email + '@gmail.com');
      setShowEmailSuggestion(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Please enter your Gmail address');
      return;
    }

    if (!validateGmail(email)) {
      setEmailError('Please enter a valid Gmail address');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setEmailError('');
    setPasswordError('');

    // Simulate login process
    try {
      // Here you would typically make an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user email (you might want to use proper state management)
      localStorage.setItem('userEmail', email);
      
      // Redirect to home page or dashboard
      // You can replace this with your routing logic
      window.location.href = '/';
      
    } catch (error) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In clicked');
  };

  return (
    <div className={`login-container ${isVisible ? 'visible' : ''}`}>
      {/* Header with Back Button and Logo */}
      <header className="login-header">
        <NavLink to="/profile" className="back-button">
          <ArrowLeft size={24} />
        </NavLink>
        
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-content">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome!</h2>
            <p className="welcome-subtitle">Sign in to continue your culinary journey</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="yourname@gmail.com"
                  className={`email-input ${emailError ? 'error' : ''}`}
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                />
                {showEmailSuggestion && (
                  <button
                    type="button"
                    className="email-suggestion"
                    onClick={handleEmailSuggestion}
                  >
                    @gmail.com
                  </button>
                )}
              </div>
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={`password-input ${passwordError ? 'error' : ''}`}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Continue
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="or-divider">
            <span>or</span>
          </div>

          <button 
            type="button" 
            className="google-signin-button"
            onClick={handleGoogleSignIn}
          >
            {/* <img src="https://www.svgrepo.com/show/61540/google.svg" alt="Google Logo" /> */}
            <img 
              src="/assets/google_logo.svg" 
              alt="Google Logo" 
            />
            Sign in with Google
          </button>

          <div className="login-footer">
            <p className="terms-text">
              By continuing, you agree to our{' '}
              <a href="/profile" className="link">Terms of Service</a> and{' '}
              <a href="/profile" className="link">Privacy Policy</a>
            </p>
        
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;