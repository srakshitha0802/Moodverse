import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateImage, validateVideo } from './vrValidation';

let OriginalImage: any;
let originalCreateElement: any;

beforeEach(() => {
  OriginalImage = (global as any).Image;
  class MockImage {
    onload: ((ev?: any) => void) | null = null;
    onerror: ((ev?: any) => void) | null = null;
    crossOrigin: string | null = null;
    private _src = '';
    set src(val: string) {
      this._src = val;
      // simulate: if url contains 'ok' -> load, 'fail' -> error, otherwise no event (timeout)
      if (val.includes('ok')) setTimeout(() => this.onload && this.onload(new Event('load')), 10);
      else if (val.includes('fail')) setTimeout(() => this.onerror && this.onerror(new Error('fail')), 10);
    }
    get src() { return this._src; }
  }
  (global as any).Image = MockImage;

  originalCreateElement = document.createElement.bind(document);
  document.createElement = ((tag: string) => {
    if (tag === 'video') {
      const video: any = {
        crossOrigin: null,
        preload: null,
        onloadedmetadata: null,
        onerror: null,
        _src: '',
        set src(val: string) {
          this._src = val;
          if (val.includes('ok')) setTimeout(() => this.onloadedmetadata && this.onloadedmetadata(new Event('loadedmetadata')), 10);
          else if (val.includes('fail')) setTimeout(() => this.onerror && this.onerror(new Error('fail')), 10);
        },
        get src() { return this._src; }
      };
      return video as any;
    }
    return originalCreateElement(tag);
  }) as any;
});

afterEach(() => {
  (global as any).Image = OriginalImage;
  document.createElement = originalCreateElement;
});

describe('validateImage', () => {
  it('resolves when image loads', async () => {
    await expect(validateImage('https://example.com/ok.jpg', 1000)).resolves.toBeUndefined();
  });

  it('rejects when image errors', async () => {
    await expect(validateImage('https://example.com/fail.jpg', 1000)).rejects.toThrow('Image failed to load');
  });

  it('rejects on timeout', async () => {
    await expect(validateImage('https://example.com/noevent.jpg', 50)).rejects.toThrow('timed out');
  });
});

describe('validateVideo', () => {
  it('resolves when video loads metadata', async () => {
    await expect(validateVideo('https://example.com/ok.mp4', 1000)).resolves.toBeUndefined();
  });

  it('rejects when video errors', async () => {
    await expect(validateVideo('https://example.com/fail.mp4', 1000)).rejects.toThrow('Video failed to load/invalid');
  });

  it('rejects on timeout', async () => {
    await expect(validateVideo('https://example.com/noevent.mp4', 50)).rejects.toThrow('timed out');
  });
});
