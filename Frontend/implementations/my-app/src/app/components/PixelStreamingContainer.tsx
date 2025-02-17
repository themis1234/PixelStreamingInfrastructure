import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Sidebars from './SideBars'; // Adjust the import path if needed.
import styles from './PixelStreamingContainer.module.css';
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';

// Declare the global window property
declare global {
  interface Window {
    pixelStreaming: PixelStreaming;
  }
}

export default function PixelStreamingContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    // Perform any necessary cleanup here before logging out.
    router.push('/login');
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
      {/* Render the sidebars as before */}
      <Sidebars />

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
}
