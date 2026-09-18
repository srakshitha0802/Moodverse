import { useEffect } from 'react';

export default function useGlobalErrorHandler() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      // Ignore known third-party library cleanup issues (e.g. A-Frame / three.js dispose on unmount)
      const msg = String(event?.message || event?.error?.message || '');
      if (msg.includes("reading 'dispose'") || msg.includes("Cannot read properties of null (reading 'dispose')")) {
        event.preventDefault();
        return;
      }
      // Friendly console message and keep the app alive
      console.error('[Global Error] Uncaught error:', event.error || event.message);
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reasonMsg = String(event?.reason?.message || event?.reason || '');
      if (reasonMsg.includes("reading 'dispose'")) {
        event.preventDefault();
        return;
      }
      console.error('[Global Error] Unhandled rejection:', event.reason);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection as any);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection as any);
    };
  }, []);
}
