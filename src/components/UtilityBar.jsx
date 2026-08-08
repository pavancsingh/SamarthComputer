import React from 'react';
import { MapPin, Phone, Clock, Globe } from 'lucide-react';
import './UtilityBar.css';

/**
 * UtilityBar Component
 * Top utility bar featuring center location, telephone, business hours,
 * language toggle (EN/मराठी), and student certificate verification quick trigger.
 */
export default function UtilityBar({ lang = 'mr', onLanguageChange, onVerifyClick = () => {} }) {
  const isMarathi = lang === 'mr';

  return (
    <header className="utility-bar" role="banner">
      <div className="container utility-bar-content">
        {/* Left Side: Address & Hours */}
        <div className="utility-left">
          <div className="utility-item">
            <MapPin className="utility-icon" aria-hidden="true" />
            <span className={isMarathi ? 'marathi-text' : ''}>
              {isMarathi 
                ? '📍 एसटी बस स्थानकाजवळ, मुख्य रस्ता, खंडाळा, सातार' 
                : '📍 Near Bus Stand, Main Road, Khandala, Satara'}
            </span>
          </div>
          <div className="utility-item utility-hide-mobile">
            <Clock className="utility-icon" aria-hidden="true" />
            <span>
              {isMarathi 
                ? 'सोम-शनि: सकाळी ८:०० ते रात्री ८:००' 
                : 'Mon-Sat: 8:00 AM - 8:00 PM'}
            </span>
          </div>
        </div>

        {/* Right Side: Direct Phone, Certificate Verification & Language Toggle */}
        <div className="utility-right">
          <a href="tel:+919822000000" className="utility-item utility-phone-link">
            <Phone className="utility-icon" aria-hidden="true" />
            <span>+91 9822X XXXXX</span>
          </a>



          <div className="utility-lang-switcher">
            <Globe className="utility-icon" aria-hidden="true" />
            <div className="lang-toggle-group">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => onLanguageChange('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="lang-divider">|</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'mr' ? 'active' : ''}`}
                onClick={() => onLanguageChange('mr')}
                aria-label="मराठीमध्ये बदला"
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
