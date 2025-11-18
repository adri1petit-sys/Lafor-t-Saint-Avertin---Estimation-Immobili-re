
// A simple cache to prevent reloading the script
let scriptLoaded = false;
let loadingPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  if (scriptLoaded) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }
  
  loadingPromise = new Promise((resolve, reject) => {
    // Check if the script is already in the DOM (e.g., from a previous load)
    if (window.google && window.google.maps) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      scriptLoaded = true;
      loadingPromise = null;
      resolve();
    };

    script.onerror = () => {
      loadingPromise = null;
      reject(new Error('Google Maps script failed to load.'));
    };

    document.head.appendChild(script);
  });

  return loadingPromise;
};
