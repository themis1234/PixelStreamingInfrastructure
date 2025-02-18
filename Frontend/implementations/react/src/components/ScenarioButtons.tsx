// app/components/ScenarioButtons.tsx

import React from 'react'
import styles from './Scenario.Buttons.module.css'
import {Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';

const config = new Config({ useUrlParams: true });
const pixelstreaming = new PixelStreaming(config);
export default function ScenarioButtons() {
  const scenarios = [
    { label: 'Run Baseline Scenario', scenarioName: 'Baseline' },
    { label: 'Scenario A', scenarioName: 'A' },
    { label: 'Scenario B', scenarioName: 'B' },
    { label: 'Scenario C', scenarioName: 'C' },
  ]

  const handleScenarioClick = (scenarioName: string) => {
    const scenarioData = { Scenario: scenarioName };
    console.log('Sending scenario data:', scenarioData);
    pixelstreaming.emitUIInteraction(scenarioData);
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
  )
}