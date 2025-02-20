import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebars from './SideBars'; 
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';
import styles from './PixelStreamingContainer.module.css';
import ScenarioButtons from './ScenarioButtons';
import locstyles from './styles.module.css';

// Extend the global Window interface to include pixelStreaming.
declare global {
  interface Window {
    pixelStreaming: PixelStreaming;
  }
}

const PixelStreamingContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [pixelStreamingInstance, setPixelStreamingInstance] = useState<PixelStreaming | null>(null);

  const handleLogout = () => {
    // Perform any necessary cleanup here before logging out.
    navigate('/login');
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and apply the style sheet for the Pixel Streaming application.
    const pixelStreamingStyles = new PixelStreamingApplicationStyle();
    pixelStreamingStyles.applyStyleSheet();

    // Create a config object. Here, using URL parameters is enabled.
    const config = new Config({ useUrlParams: true });

    // Create a new Pixel Streaming instance.
    const stream = new PixelStreaming(config);
    setPixelStreamingInstance(stream);

    // Create the Pixel Streaming application, specifying a callback for color mode changes.
    const application = new Application({
      stream,
      onColorModeChanged: (isLightMode: boolean) => {
        pixelStreamingStyles.setColorMode(isLightMode);
      },
    });

    // Append the application’s root element to the container.
    containerRef.current.appendChild(application.rootElement);

    // Expose the Pixel Streaming object globally for testing or other hooks.
    window.pixelStreaming = stream;

    // Cleanup: remove the application element when the component unmounts.
    return () => {
      if (containerRef.current && application.rootElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(application.rootElement);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Render the sidebars */}
      <Sidebars>
        <div>
          <div className={locstyles.location}>
            Jättesten, Gothenburg, Sweden
          </div>
          {/* Ensure that the instance is set before rendering the buttons */}
          {pixelStreamingInstance && <ScenarioButtons pixelStreaming={pixelStreamingInstance} />}
        </div>
      </Sidebars>

      {/* Main content area */}
      <main className={styles.mainContent}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
        {/* The Pixel Streaming application will be appended inside this container */}
        <div ref={containerRef} className={styles.pixelStreamingContainer} />
      </main>
    </div>
  );
};

export default PixelStreamingContainer;
