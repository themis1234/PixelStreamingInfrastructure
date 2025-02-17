// app/components/Sidebars.tsx
'use client'

import React, { useState } from 'react'
import styles from './Sidebars.module.css'
import MiniSideBar from './MiniSideBar'
import SideBar from './SideBar'

export default function Sidebars() {
  // State to track whether the big sidebar is open
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true)

  const toggleBigSidebar = () => {
    setBigSidebarOpen((prev) => !prev)
  }

  // Decide which arrow to show
  const arrow = bigSidebarOpen ? '←' : '→'

  return (
    <div className={styles.sidebars}>
      {/* Always show the mini sidebar */}
      <MiniSideBar />

      {/* Toggle button sits between mini and big sidebar */}
      <button className={styles.toggleButton} onClick={toggleBigSidebar}>
        {arrow}
      </button>

      {/* Conditionally render the big sidebar */}
      {bigSidebarOpen && <SideBar />}
    </div>
  )
}
