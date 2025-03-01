// Utilitário para otimizar operações pesadas
export function debouncedFunction(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Quebrar tarefas longas usando requestIdleCallback
export function breakLongTask(items, processItem, onComplete) {
  const itemsToProcess = [...items];
  
  function processNextBatch() {
    const startTime = performance.now();
    
    while (itemsToProcess.length > 0 && performance.now() - startTime < 50) {
      const item = itemsToProcess.shift();
      processItem(item);
    }
    
    if (itemsToProcess.length > 0) {
      // Continuar na próxima idle callback ou frame
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(processNextBatch);
      } else {
        requestAnimationFrame(processNextBatch);
      }
    } else if (onComplete) {
      onComplete();
    }
  }
  
  processNextBatch();
} 