import React, { useState } from 'react';
import './styles/App.css';
import { Header } from './components/Header';
import { ContributionTypeSelector } from './components/ContributionTypeSelector';
import { ContributionSlider } from './components/ContributionSlider';
import { DisplayCards } from './components/DisplayCards';
import { ProjectedSavings } from './components/ProjectedSavings';

function App() {
  const [contributionType, setContributionType] = useState<'percentage' | 'fixed'>('percentage');
  const [contributionValue, setContributionValue] = useState<number>(5);

  const handleTypeChange = (type: 'percentage' | 'fixed') => {
    setContributionType(type);
    // Reset to a reasonable default when switching types
    if (type === 'percentage') {
      setContributionValue(5);
    } else {
      setContributionValue(200);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <div className="app-content">
        <div className="content-wrapper">
          <section className="section">
            <ContributionTypeSelector
              contributionType={contributionType}
              onTypeChange={handleTypeChange}
            />
            <ContributionSlider
              contributionType={contributionType}
              contributionValue={contributionValue}
              onValueChange={setContributionValue}
            />
          </section>

          <section className="section">
            <DisplayCards
              contributionType={contributionType}
              contributionValue={contributionValue}
            />
          </section>

          <section className="section">
            <ProjectedSavings
              contributionType={contributionType}
              contributionValue={contributionValue}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

