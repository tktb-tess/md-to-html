import { SvelteMap } from 'svelte/reactivity';

export type ToastType = 'info' | 'warning' | 'caution' | 'ok';
type Toast = {
  text: string;
  duration: number;
  type: ToastType;
  timeoutID: number;
};

export const toasts = new SvelteMap<number, Toast>();

export const addToast = (text: string, duration: number, type: ToastType) => {
  const id = Date.now();

  const timeoutID = setTimeout(() => {
    dismissToast(id);
  }, duration);

  toasts.set(id, { text, duration, timeoutID, type });
};

export const dismissToast = (id: number) => {
  const t = toasts.get(id);
  if (!t) return;
  clearTimeout(t.timeoutID);
  toasts.delete(id);
};
