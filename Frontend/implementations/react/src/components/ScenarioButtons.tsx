import React from 'react';
import styles from './Scenario.Buttons.module.css';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';

interface ScenarioButtonsProps {
  pixelStreaming: PixelStreaming;
}

export default function ScenarioButtons({ pixelStreaming }: ScenarioButtonsProps) {
  const scenarios = [
    // { label: 'Run Baseline Scenario', scenarioName: 'Baseline' },
    { label: 'Incident Radiation', scenarioName: 'A' },
    { label: 'PV Capacity', scenarioName: 'B' },
    { label: 'Nominal Yield', scenarioName: 'C' },
  ];

  const handleScenarioClick = (scenarioName: string) => {
    const scenarioData = { Scenario: scenarioName };
    console.log('Sending scenario data:', scenarioData);
    pixelStreaming.emitUIInteraction(scenarioData);
  };

  return (
    <div className={styles.buttonList}>
      {scenarios.map((scenario, idx) => (
        <button
          key={idx}
          className={styles.scenarioButton}
          onClick={() => handleScenarioClick(scenario.scenarioName)}
        >
          {scenario.label}
        </button>
      ))}
    </div>
  );
}
