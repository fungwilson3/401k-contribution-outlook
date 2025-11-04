import React, { useState } from 'react';
import '../styles/ProjectedSavings.css';
import { useContributionCalculations } from '../hooks/useContributionCalculations';
import { calculateProjectedSavings, mockUserData } from '../data/mockData';

interface ProjectedSavingsProps {
  contributionType: 'percentage' | 'fixed';
  contributionValue: number;
}

export const ProjectedSavings: React.FC<ProjectedSavingsProps> = ({
  contributionType,
  contributionValue,
}) => {
  const [retirementAge, setRetirementAge] = useState(65);
  const calculations = useContributionCalculations(contributionType, contributionValue);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Assuming user is 30 years old (can be made configurable)
  const currentAge = 30;
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  
  const projectedSavings = calculateProjectedSavings(
    mockUserData.currentSavings,
    calculations.annualContribution,
    mockUserData.employerMatch,
    yearsToRetirement
  );

  return (
    <div className="projected-savings">
      <h3>Projected Savings at Retirement</h3>
      
      <div className="retirement-age-selector">
        <label htmlFor="retirement-age">
          Retirement Age: {retirementAge} years old
        </label>
        <input
          id="retirement-age"
          type="range"
          min={55}
          max={70}
          step={1}
          value={retirementAge}
          onChange={(e) => setRetirementAge(parseInt(e.target.value))}
          className="age-slider"
        />
        <div className="age-labels">
          <span>55</span>
          <span>70</span>
        </div>
      </div>

      <div className="projection-card">
        <div className="projection-header">
          <h4>Projected Savings</h4>
          <p className="years-label">{yearsToRetirement} years</p>
        </div>
        <p className="projection-value">{formatCurrency(projectedSavings)}</p>
        <p className="projection-note">
          Based on 7% average annual return and current contribution rate
        </p>
      </div>

      <div className="projection-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-label">Current Balance:</span>
          <span className="breakdown-value">{formatCurrency(mockUserData.currentSavings)}</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Annual Contribution:</span>
          <span className="breakdown-value">{formatCurrency(calculations.totalAnnualContribution)}</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Projected Growth:</span>
          <span className="breakdown-value">
            {formatCurrency(projectedSavings - mockUserData.currentSavings - (calculations.totalAnnualContribution * yearsToRetirement))}
          </span>
        </div>
      </div>
    </div>
  );
};

