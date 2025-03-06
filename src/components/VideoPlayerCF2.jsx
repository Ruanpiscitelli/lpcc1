'use client';

import React from 'react';
import styles from '../styles/VideoPlayer.module.css';

const VideoPlayerCF2 = () => {
  return (
    <div className={styles.videoContainer}>
      <script src="https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js" data-id="67c39663c033d97a19fff443"></script>
      <div id="ifr_67c39663c033d97a19fff443_wrapper" style={{ margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_67c39663c033d97a19fff443_aspect">
          <iframe 
            frameBorder="0" 
            allowFullScreen 
            id="ifr_67c39663c033d97a19fff443"
            src="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/embed.html"
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

VideoPlayerCF2.displayName = 'VideoPlayerCF2';

export default VideoPlayerCF2; 