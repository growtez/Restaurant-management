import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signUp, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showEmailSuggestion, setShowEmailSuggestion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');

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
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    if (isSignUp && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setEmailError('');
    setPasswordError('');

    try {
      if (isSignUp) {
        await signUp(email, password, name || email.split('@')[0]);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      if (error.code === 'auth/user-not-found') {
        setEmailError('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else if (error.code === 'auth/email-already-in-use') {
        setEmailError('An account already exists with this email');
      } else if (error.code === 'auth/invalid-credential') {
        setEmailError('Invalid email or password');
      } else {
        setEmailError(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setEmailError('');

    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no error needed
      } else {
        setEmailError('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
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
            className={`google-signin-button ${isGoogleLoading ? 'loading' : ''}`}
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                />
                Sign in with Google
              </>
            )}
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