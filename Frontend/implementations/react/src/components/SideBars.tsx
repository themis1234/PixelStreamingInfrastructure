'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Sidebars.module.css'
import MiniSideBar from './MiniSideBar'
import SideBar from './SideBar'

export default function Sidebars() {
  // State to track whether the big sidebar is open
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true)

  const toggleBigSidebar = () => {
    setBigSidebarOpen((prev) => !prev)
  }

  return (
    <div className={styles.sidebars}>
      {/* Always show the mini sidebar */}
      <MiniSideBar />

      {/* Toggle button sits between mini and big sidebar */}
      <button className={styles.toggleButton} onClick={toggleBigSidebar}>
        {bigSidebarOpen ? <ChevronLeft size={70} strokeWidth={2} style={{marginLeft:'-10px', marginRight:'-10px'}} /> : <ChevronRight size={70} strokeWidth={2} style={{marginLeft:'-10px', marginRight:'-10px'}} />}
      </button>

      {/* Conditionally render the big sidebar */}
      {bigSidebarOpen && <SideBar />}
    </div>
  )
}
