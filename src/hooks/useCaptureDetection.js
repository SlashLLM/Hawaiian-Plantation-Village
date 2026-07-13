import { useEffect, useRef } from 'react';

const DEBOUNCE_MS = 30_000;

export function useCaptureDetection(isActive) {
  const lastAlertRef = useRef({});

  useEffect(() => {
    if (!isActive) return;

    const sendAlert = async (type, detail = '') => {
      const now = Date.now();
      const lastSent = lastAlertRef.current[type] || 0;
      if (now - lastSent < DEBOUNCE_MS) return;

      lastAlertRef.current[type] = now;

      try {
        await fetch('/api/alerts/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ type, detail }),
        });
      } catch {
        // Best-effort alerting; ignore network failures.
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'PrintScreen') {
        sendAlert('printscreen');
      }
    };

    const handleContextMenu = () => {
      sendAlert('contextmenu');
    };

    const handleCopy = () => {
      sendAlert('copy');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendAlert('visibility_hidden');
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);
}
