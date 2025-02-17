'use client'

import Head from 'next/head';
import { useEffect, useRef } from 'react';

const PlayerPage: React.FC = () => {
  // Create a ref to hold the container element for the player
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = playerContainerRef.current;
    if (!container) return;

    // Initialize your Pixel Streaming player here.
    // For example, if your original player.ts exposed a global function to start the player:
    if (typeof window !== 'undefined' && (window as any).initializePixelStreamingPlayer) {
      (window as any).initializePixelStreamingPlayer(container);
    } else {
      console.warn('Player initialization function not found. Loading script dynamically.');

      // Optionally, load your player script dynamically
      const script = document.createElement('script');
      script.src = '/assets/js/pixelStreamingPlayer.js'; // adjust the path as needed
      script.async = true;
      script.onload = () => {
        if ((window as any).initializePixelStreamingPlayer) {
          (window as any).initializePixelStreamingPlayer(container);
        }
      };
      document.body.appendChild(script);
    }

    // Optional cleanup when the component unmounts
    return () => {
      if (typeof window !== 'undefined' && (window as any).cleanupPixelStreamingPlayer) {
        (window as any).cleanupPixelStreamingPlayer();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
        <title>Pixel Streaming</title>
      </Head>
      {/* The container for your Pixel Streaming player */}
      <div
        ref={playerContainerRef}
        style={{
          width: '100vw',
          height: '100svh',
          minHeight: '-webkit-fill-available',
          overflow: 'hidden',
          overscrollBehavior: 'none',
          fontFamily: 'Montserrat',
          margin: 0,
        }}
      />
    </>
  );
};

export default PlayerPage;
