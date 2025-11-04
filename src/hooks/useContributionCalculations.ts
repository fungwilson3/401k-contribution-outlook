import { useMemo } from 'react';
import {
  calculateAnnualContribution,
  calculateProjectedSavings,
  mockUserData,
} from '../data/mockData';

export interface ContributionState {
  contributionType: 'percentage' | 'fixed';
  contributionValue: number;
}

export const useContributionCalculations = (
  contributionType: 'percentage' | 'fixed',
  contributionValue: number
) => {
  const calculations = useMemo(() => {
    const annualContribution = calculateAnnualContribution(
      contributionValue,
      contributionType,
      mockUserData.salary,
      mockUserData.payPeriodsPerYear
    );

    const payPeriodContribution =
      contributionType === 'percentage'
        ? (contributionValue / 100) * (mockUserData.salary / mockUserData.payPeriodsPerYear)
        : contributionValue;

    const employerMatchContribution =
      annualContribution * (mockUserData.employerMatch / 100);

    const totalAnnualContribution = annualContribution + employerMatchContribution;

    // Projected savings for different retirement ages
    const yearsToRetirement65 = 65 - 30; // Assuming user is 30, adjust as needed
    const projectedSavings65 = calculateProjectedSavings(
      mockUserData.currentSavings,
      annualContribution,
      mockUserData.employerMatch,
      yearsToRetirement65
    );

    return {
      annualContribution,
      payPeriodContribution,
      employerMatchContribution,
      totalAnnualContribution,
      projectedSavings65,
    };
  }, [contributionType, contributionValue]);

  return calculations;
};

