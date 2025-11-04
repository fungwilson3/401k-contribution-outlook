import React from 'react';
import '../styles/ContributionSlider.css';
import { mockUserData } from '../data/mockData';

interface ContributionSliderProps {
  contributionType: 'percentage' | 'fixed';
  contributionValue: number;
  onValueChange: (value: number) => void;
}

export const ContributionSlider: React.FC<ContributionSliderProps> = ({
  contributionType,
  contributionValue,
  onValueChange,
}) => {
  const payPeriodAmount = mockUserData.salary / mockUserData.payPeriodsPerYear;
  const maxValue = contributionType === 'percentage' ? 100 : payPeriodAmount;
  const minValue = 0;
  const step = contributionType === 'percentage' ? 0.1 : 0.01;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onValueChange(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const clampedValue = Math.max(minValue, Math.min(maxValue, value));
    onValueChange(clampedValue);
  };

  const displayValue = contributionType === 'percentage' 
    ? `${contributionValue.toFixed(1)}%`
    : `$${contributionValue.toFixed(2)}`;

  const maxDisplayValue = contributionType === 'percentage'
    ? '100%'
    : `$${maxValue.toFixed(2)}`;

  return (
    <div className="contribution-slider">
      <div className="slider-header">
        <h3>Adjust Contribution Rate</h3>
        <div className="current-value-display">
          <span className="value-label">Current:</span>
          <span className="value-amount">{displayValue}</span>
        </div>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={contributionValue}
          onChange={handleSliderChange}
          className="slider-input"
          aria-label={`Adjust ${contributionType === 'percentage' ? 'percentage' : 'dollar amount'} contribution`}
        />
        <div className="slider-labels">
          <span>
            {contributionType === 'percentage' ? `${minValue}%` : `$${minValue.toFixed(2)}`}
          </span>
          <span>{maxDisplayValue}</span>
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="contribution-input">
          Enter {contributionType === 'percentage' ? 'percentage' : 'amount'}:
        </label>
        <div className="input-wrapper">
          {contributionType === 'percentage' ? (
            <input
              id="contribution-input"
              type="number"
              min={minValue}
              max={maxValue}
              step={step}
              value={contributionValue}
              onChange={handleInputChange}
              className="number-input"
            />
          ) : (
            <div className="dollar-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                id="contribution-input"
                type="number"
                min={minValue}
                max={maxValue}
                step={step}
                value={contributionValue}
                onChange={handleInputChange}
                className="number-input"
              />
            </div>
          )}
        </div>
        {contributionType === 'percentage' && (
          <p className="helper-text">
            Based on your ${payPeriodAmount.toFixed(2)} per paycheck
          </p>
        )}
      </div>
    </div>
  );
};

