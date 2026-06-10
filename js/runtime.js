window.ScaleMe = {
  THREE_URL: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',

  loadScript(src) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      return existing.dataset.loaded === 'true'
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
          });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  },

  loadThree() {
    return this.loadScript(this.THREE_URL);
  },

  whenIdle(callback, timeout) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: timeout || 2500 });
    } else {
      setTimeout(callback, 1);
    }
  }
};
