// app/components/SideBar.tsx
'use client'

import React from 'react'
import { User } from 'lucide-react' // Importing a user icon
import styles from './SideBar.module.css'
import ScenarioButtons from './ScenarioButtons'

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.titleBar}>
        <div className={styles.userInfo}>
          <User className={styles.userIcon} size={16} />
          <span className={styles.userName}>Poseidon</span>
        </div>
        
      </div>
      <div className={styles.location}>
          Jättesten, Gothenburg, Sweden
        </div>
      <ScenarioButtons />
    </div>
  )
}
