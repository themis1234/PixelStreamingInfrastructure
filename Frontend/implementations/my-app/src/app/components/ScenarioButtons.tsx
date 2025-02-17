// app/components/ScenarioButtons.tsx
'use client'

import React from 'react'
import styles from './Scenario.Buttons.module.css'
export default function ScenarioButtons() {
  const scenarios = [
    { label: 'Run Baseline Scenario', onClick: () => alert('Baseline') },
    { label: 'Scenario A', onClick: () => alert('Scenario A') },
    { label: 'Scenario B', onClick: () => alert('Scenario B') },
    { label: 'Scenario C', onClick: () => alert('Scenario C') },
  ]

  return (
    <div className={styles.buttonList}>
      {scenarios.map((scenario, idx) => (
        <button
          key={idx}
          className={styles.scenarioButton}
          onClick={scenario.onClick}
        >
          {scenario.label}
        </button>
      ))}
    </div>
  )
}
