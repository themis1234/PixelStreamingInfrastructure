import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface MapResizerProps {
  sidebarCollapsed: boolean;
}

const MapResizer: React.FC<MapResizerProps> = ({ sidebarCollapsed }) => {
  const map = useMap();

  useEffect(() => {
    // Use a timeout (or a transition end listener) so the CSS transition finishes
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 300); // adjust timing based on your transition duration

    return () => clearTimeout(timeout);
  }, [sidebarCollapsed, map]);

  return null;
};

export default MapResizer;
