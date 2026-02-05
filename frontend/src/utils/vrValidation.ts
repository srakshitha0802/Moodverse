export function validateImage(url: string, timeout = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let timer: any = setTimeout(() => {
      cleanup();
      reject(new Error('Image load timed out'));
    }, timeout);

    function cleanup() {
      clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
    }

    img.onload = () => { cleanup(); resolve(); };
    img.onerror = () => { cleanup(); reject(new Error('Image failed to load')); };
    img.src = url;
  });
}

export function validateVideo(url: string, timeout = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const v: any = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.preload = 'metadata';

    let timer: any = setTimeout(() => {
      cleanup();
      reject(new Error('Video load timed out'));
    }, timeout);

    function cleanup() {
      clearTimeout(timer);
      v.onloadedmetadata = null;
      v.onerror = null;
    }

    v.onloadedmetadata = () => { cleanup(); resolve(); };
    v.onerror = () => { cleanup(); reject(new Error('Video failed to load/invalid')); };
    v.src = url;
  });
}
