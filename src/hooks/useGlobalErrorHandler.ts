import { useEffect } from 'react';

export default function useGlobalErrorHandler() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      // Friendly console message and keep the app alive
      console.error('[Global Error] Uncaught error:', event.error || event.message, event.error?.stack);
      // Optionally: show a user-facing toast/overlay in the future
    };

    const onRejection = (event: PromiseRejectionEvent) => {
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
