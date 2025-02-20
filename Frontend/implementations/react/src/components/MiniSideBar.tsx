import styles from './MiniSideBar.module.css';
import { Search, MapPin, Home, Layers, Zap, Thermometer, SlidersHorizontal, ChartNoAxesCombined, FileText } from 'lucide-react';

interface MiniSideBarProps {
  onStatsClick: () => void;
}

export default function MiniSideBar({ onStatsClick }: MiniSideBarProps) {
  const miniButtons = [
    { icon: <Search />, onClick: () => alert('Search') },
    { icon: <MapPin />, onClick: () => alert('Location') },
    { icon: <Home />, onClick: () => alert('Home') },
    { icon: <Layers />, onClick: () => alert('Stack') },
    { icon: <Zap />, onClick: () => alert('Thunder') },
    { icon: <Thermometer />, onClick: () => alert('Thermometer') },
    { icon: <SlidersHorizontal />, onClick: () => alert('Settings') },
    { icon: <ChartNoAxesCombined />, onClick: onStatsClick }, // Open Graph Panel
    { icon: <FileText />, onClick: () => alert('PDF') },
  ];

  return (
    <div className={styles.miniSideBar}>
      {miniButtons.map((b, idx) => (
        <button key={idx} onClick={b.onClick} className={styles.miniButton}>
          {b.icon}
        </button>
      ))}
    </div>
  );
}
