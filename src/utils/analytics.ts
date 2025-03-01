export function reportWebVitals(metric: any) {
  // Métricas Core Web Vitals
  const vitalsMetrics = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'];
  
  if (vitalsMetrics.includes(metric.name)) {
    console.log(metric.name, metric.value);
    
    // Enviar para analytics (exemplo com Google Analytics)
    const analyticsData = {
      name: metric.name,
      delta: Math.round(metric.delta * 1000) / 1000,
      value: Math.round(metric.value * 1000) / 1000,
      id: metric.id
    };

    // Enviar para sua ferramenta de analytics
    if (window.gtag) {
      window.gtag('event', metric.name.toLowerCase(), {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  }
}

// Função para monitorar Layout Shifts
export function observeLayoutShifts() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.hadRecentInput) continue;
        
        console.log('Layout Shift:', {
          value: entry.value,
          sources: entry.sources
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Função para monitorar Long Tasks
export function observeLongTasks() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('Long Task:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    }).observe({ entryTypes: ['longtask'] });
  }
}

// Função para monitorar Resource Timing
export function observeResourceTiming() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.initiatorType === 'resource') {
          console.log('Resource Timing:', {
            name: entry.name,
            duration: entry.duration,
            transferSize: entry.transferSize,
            initiatorType: entry.initiatorType
          });
        }
      }
    }).observe({ entryTypes: ['resource'] });
  }
} 