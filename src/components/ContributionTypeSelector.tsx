import React from 'react';
import '../styles/ContributionTypeSelector.css';

interface ContributionTypeSelectorProps {
  contributionType: 'percentage' | 'fixed';
  onTypeChange: (type: 'percentage' | 'fixed') => void;
}

export const ContributionTypeSelector: React.FC<ContributionTypeSelectorProps> = ({
  contributionType,
  onTypeChange,
}) => {
  return (
    <div className="contribution-type-selector">
      <h3>Contribution Type</h3>
      <div className="type-options">
        <button
          className={`type-button ${contributionType === 'percentage' ? 'active' : ''}`}
          onClick={() => onTypeChange('percentage')}
          aria-pressed={contributionType === 'percentage'}
        >
          Percentage of Paycheck
        </button>
        <button
          className={`type-button ${contributionType === 'fixed' ? 'active' : ''}`}
          onClick={() => onTypeChange('fixed')}
          aria-pressed={contributionType === 'fixed'}
        >
          Fixed Dollar Amount
        </button>
      </div>
    </div>
  );
};

