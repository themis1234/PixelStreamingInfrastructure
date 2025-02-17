// app/components/SideBar.tsx
'use client'

import React from 'react'
import styles from './SideBar.module.css'
import ScenarioButtons from './ScenarioButtons'

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.titleBar}>
        <div className={styles.logo}>Poseidon</div>
        <div className={styles.location}>
          Jättesten, Gothenburg, Sweden
        </div>
      </div>
      <ScenarioButtons />
    </div>
  )
}
