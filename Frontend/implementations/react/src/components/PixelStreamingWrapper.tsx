// PixelStreamingWrapper.tsx
// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useEffect, useRef } from 'react';
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';

// Extend the global Window interface to expose pixelStreaming.
declare global {
  interface Window {
    pixelStreaming: PixelStreaming;
  }
}

interface PixelStreamingWrapperProps {
  initialSettings: {
    AutoPlayVideo: boolean;
    AutoConnect: boolean;
    ss: string;
    StartVideoMuted: boolean;
    HoveringMouse: boolean;
    WaitForStreamer: boolean;
    // Add additional settings here if needed.
  };
}

export const PixelStreamingWrapper: React.FC<PixelStreamingWrapperProps> = ({ initialSettings }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and apply the Pixel Streaming Application style.
    const pixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
    pixelStreamingApplicationStyles.applyStyleSheet();

    // Merge the default configuration with the provided initial settings.
    const config = new Config({ useUrlParams: true, ...initialSettings });

    // Create the PixelStreaming stream instance.
    const stream = new PixelStreaming(config);

    // Create the Application instance with a callback for color mode changes.
    const application = new Application({
      stream,
      onColorModeChanged: (isLightMode: boolean) => {
        pixelStreamingApplicationStyles.setColorMode(isLightMode);
      },
    });

    // Append the application's root element to the container.
    if (containerRef.current) {
      containerRef.current.appendChild(application.rootElement);
    } else {
      document.body.appendChild(application.rootElement);
    }

    // Expose the PixelStreaming stream globally (for testing, hooks, etc.).
    window.pixelStreaming = stream;

    // Cleanup: remove the application element when the component unmounts.
    return () => {
      if (containerRef.current && application.rootElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(application.rootElement);
      } else if (document.body.contains(application.rootElement)) {
        document.body.removeChild(application.rootElement);
      }
    };
  }, [initialSettings]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
