'use client';

import React, { useEffect, useRef, memo } from 'react';
import styles from '../styles/VideoPlayer.module.css';

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const containerRef = useRef(null);
  const linksAdded = useRef(false);
  const scriptAdded = useRef(false);
  
  useEffect(() => {
    // Adicionar links de preload na head
    if (!linksAdded.current && typeof document !== 'undefined') {
      const linkElements = [
        { rel: "prerender", href: "https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/embed.html" },
        { rel: "preload", href: "https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/player.js", as: "script" },
        { rel: "preload", href: "https://scripts.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js", as: "script" },
        { rel: "preload", href: "https://images.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/thumbnail.jpg", as: "image" },
        { rel: "preload", href: "https://cdn.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/67c39619d101505792b6e188/main.m3u8", as: "fetch" },
        { rel: "dns-prefetch", href: "https://cdn.converteai.net" },
        { rel: "dns-prefetch", href: "https://scripts.converteai.net" },
        { rel: "dns-prefetch", href: "https://images.converteai.net" },
        { rel: "dns-prefetch", href: "https://api.vturb.com.br" }
      ];
      
      const fragment = document.createDocumentFragment();
      linkElements.forEach(link => {
        const linkEl = document.createElement('link');
        linkEl.rel = link.rel;
        linkEl.href = link.href;
        if (link.as) linkEl.setAttribute('as', link.as);
        fragment.appendChild(linkEl);
      });
      
      document.head.appendChild(fragment);
      linksAdded.current = true;
    }
    
    // Adicionar o script apenas quando o componente montar
    if (!scriptAdded.current && typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = "https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
      script.setAttribute('data-id', '67c39663c033d97a19fff443');
      document.head.appendChild(script);
      scriptAdded.current = true;
    }
  }, []);

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      <div id="ifr_67c39663c033d97a19fff443_wrapper" style={{ margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_67c39663c033d97a19fff443_aspect">
          <iframe 
            frameBorder="0" 
            allowFullScreen 
            src="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/embed.html" 
            id="ifr_67c39663c033d97a19fff443" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            referrerPolicy="origin"
          ></iframe>
        </div>
      </div>
    </div>
  );
});

VideoPlayerWrapper.displayName = 'VideoPlayerWrapper';

export default VideoPlayerWrapper; 