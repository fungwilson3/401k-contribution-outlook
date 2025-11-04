export interface UserData {
  salary: number;
  ytdContributions: number;
  currentSavings: number;
  employerMatch: number; // percentage of employee contribution
  payPeriodsPerYear: number;
}

export const mockUserData: UserData = {
  salary: 75000,
  ytdContributions: 6250,
  currentSavings: 45000,
  employerMatch: 50, // 50% match up to a certain limit
  payPeriodsPerYear: 26, // bi-weekly pay
};

export const calculatePayPeriodAmount = (salary: number, payPeriodsPerYear: number): number => {
  return salary / payPeriodsPerYear;
};

export const calculateAnnualContribution = (
  contributionValue: number,
  contributionType: 'percentage' | 'fixed',
  salary: number,
  payPeriodsPerYear: number
): number => {
  if (contributionType === 'percentage') {
    return (contributionValue / 100) * salary;
  } else {
    return contributionValue * payPeriodsPerYear;
  }
};

export const calculateProjectedSavings = (
  currentSavings: number,
  annualContribution: number,
  employerMatch: number,
  yearsToRetirement: number,
  annualReturnRate: number = 0.07 // 7% average annual return
): number => {
  let projected = currentSavings;
  const totalAnnualContribution = annualContribution * (1 + employerMatch / 100);
  
  for (let year = 0; year < yearsToRetirement; year++) {
    projected = projected * (1 + annualReturnRate) + totalAnnualContribution;
  }
  
  return projected;
};

