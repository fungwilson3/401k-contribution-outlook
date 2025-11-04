import React from 'react';
import '../styles/DisplayCards.css';
import { mockUserData } from '../data/mockData';
import { useContributionCalculations } from '../hooks/useContributionCalculations';

interface DisplayCardsProps {
  contributionType: 'percentage' | 'fixed';
  contributionValue: number;
}

export const DisplayCards: React.FC<DisplayCardsProps> = ({
  contributionType,
  contributionValue,
}) => {
  const calculations = useContributionCalculations(contributionType, contributionValue);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="display-cards">
      <div className="card">
        <h4>Annual Salary</h4>
        <p className="card-value">{formatCurrency(mockUserData.salary)}</p>
        <p className="card-label">Per year</p>
      </div>

      <div className="card">
        <h4>YTD Contributions</h4>
        <p className="card-value">{formatCurrency(mockUserData.ytdContributions)}</p>
        <p className="card-label">Year-to-date</p>
      </div>

      <div className="card">
        <h4>Current Savings</h4>
        <p className="card-value">{formatCurrency(mockUserData.currentSavings)}</p>
        <p className="card-label">Total 401(k) balance</p>
      </div>

      {/* Bottom Row - Contribution Related */}
      <div className="card highlight">
        <h4>Current Contribution</h4>
        <p className="card-value">{formatCurrency(calculations.payPeriodContribution)}</p>
        <p className="card-label">Per paycheck</p>
      </div>

      <div className="card highlight">
        <h4>Annual Contribution</h4>
        <p className="card-value">{formatCurrency(calculations.annualContribution)}</p>
        <p className="card-label">
          {contributionType === 'percentage'
            ? `${contributionValue.toFixed(1)}% of salary`
            : `$${contributionValue.toFixed(2)} × ${mockUserData.payPeriodsPerYear} pay periods`}
        </p>
      </div>

      <div className="card highlight">
        <h4>Employer Match</h4>
        <p className="card-value">{formatCurrency(calculations.employerMatchContribution)}</p>
        <p className="card-label">{mockUserData.employerMatch}% match</p>
      </div>

      <div className="card highlight">
        <h4>Total Annual</h4>
        <p className="card-value">{formatCurrency(calculations.totalAnnualContribution + mockUserData.ytdContributions)}</p>
        <p className="card-label">Includes employer match and YTD contributions</p>
      </div>
    </div>
  );
};

