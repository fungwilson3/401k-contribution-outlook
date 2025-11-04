import React from 'react';
import '../styles/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">h</div>
            <span className="logo-text">
              <span className="logo-text-dark">Human</span>
              <span className="logo-text-light">Interest</span>
            </span>
          </div>
          <nav className="header-nav">
            <button className="nav-link" onClick={(e) => e.preventDefault()}>Overview</button>
            <button className="nav-link" onClick={(e) => e.preventDefault()}>History</button>
            <button className="nav-link active" onClick={(e) => e.preventDefault()}>401k Calculator</button>
            <button className="nav-link" onClick={(e) => e.preventDefault()}>Rollovers & Withdrawals</button>
            <button className="nav-link" onClick={(e) => e.preventDefault()}>Loans</button>
            <button className="nav-link" onClick={(e) => e.preventDefault()}>Documents</button>
            <button className="nav-link" onClick={(e) => e.preventDefault()}>Plan Details</button>
          </nav>
        </div>
        <div className="header-right">
          <button className="help-button" aria-label="Help">
            <span className="help-icon">?</span>
          </button>
          <span className="user-name">Wilson Fung</span>
          <div className="profile-icon" aria-label="Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
              <path d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
