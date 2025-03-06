'use client';

import React from 'react';
import styles from '../styles/VideoPlayer.module.css';

const VideoPlayerCF1 = () => {
  return (
    <div className={styles.videoContainer}>
      <script src="https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js" data-id="6759dd77d07a5ff5c7ca43f4"></script>
      <div id="ifr_6759dd77d07a5ff5c7ca43f4_wrapper" style={{ margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_6759dd77d07a5ff5c7ca43f4_aspect">
          <iframe 
            frameBorder="0" 
            allowFullScreen 
            id="ifr_6759dd77d07a5ff5c7ca43f4"
            src="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            referrerPolicy="origin"
          />
        </div>
      </div>
    </div>
  );
};

VideoPlayerCF1.displayName = 'VideoPlayerCF1';

export default VideoPlayerCF1; 