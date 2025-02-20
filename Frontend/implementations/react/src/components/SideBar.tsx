// app/components/SideBar.tsx
'use client'

import React from 'react'
import { User } from 'lucide-react'
import styles from './SideBar.module.css'

interface SideBarProps {
  children?: React.ReactNode
}

export default function SideBar({ children }: SideBarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.titleBar}>
        <div className={styles.userInfo}>
          <User className={styles.userIcon} size={16} />
          <span className={styles.userName}>Poseidon</span>
        </div>
      </div>
      {children}
    </div>
  )
}
