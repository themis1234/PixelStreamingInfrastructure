'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Sidebars.module.css';
import MiniSideBar from './MiniSideBar';
import SideBar from './SideBar';
import GraphPanel from './GraphPanel';

interface SideBarProps {
  children?: React.ReactNode;
}

export default function Sidebars({ children }: SideBarProps) {
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true);
  const [graphPanelOpen, setGraphPanelOpen] = useState(false);

  const toggleBigSidebar = () => {
    setBigSidebarOpen((prev) => !prev);
  };

  const toggleGraphPanel = () => {
    setGraphPanelOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.sidebars}>
        <MiniSideBar onStatsClick={toggleGraphPanel} />

        <button className={styles.toggleButton} onClick={toggleBigSidebar}>
          {bigSidebarOpen ? <ChevronLeft size={70} strokeWidth={2} /> : <ChevronRight size={70} strokeWidth={2} />}
        </button>

        {bigSidebarOpen && <SideBar>{children}</SideBar>}
      </div>

      {/* Ensure GraphPanel is outside of Sidebars and positioned correctly */}
      {graphPanelOpen && <GraphPanel />}
    </>
  );
}
