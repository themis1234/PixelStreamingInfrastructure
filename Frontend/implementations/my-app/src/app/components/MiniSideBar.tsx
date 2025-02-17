// app/components/MiniSideBar.tsx
import React from 'react'
import styles from './MiniSideBar.module.css'

export default function MiniSideBar() {
  // Example: an array of button labels or icons
  const miniButtons = [
    { label: 'Btn 1', onClick: () => alert('Btn 1') },
    { label: 'Btn 2', onClick: () => alert('Btn 2') },
    { label: 'Btn 3', onClick: () => alert('Btn 3') },
    { label: 'Btn 4', onClick: () => alert('Btn 4') },
    // ...add as many as you need
  ]

  return (
    <div className={styles.miniSideBar}>
      {miniButtons.map((b, idx) => (
        <button key={idx} onClick={b.onClick} className={styles.miniButton}>
          {b.label}
        </button>
      ))}
    </div>
  )
}
