import { SvelteMap } from 'svelte/reactivity';

type UUID = ReturnType<typeof crypto.randomUUID>;
type ToastType = 'info' | 'warning' | 'caution' | 'ok';
type Toast = {
  text: string;
  duration: number;
  type: ToastType;
  timeoutID: number;
};

export const toasts = new SvelteMap<UUID, Toast>();

export const addToast = (text: string, duration: number, type: ToastType) => {
  const id = crypto.randomUUID();
  const timeoutID = setTimeout(() => {
    dismissToast(id);
  }, duration);
  toasts.set(id, { text, duration, timeoutID, type });
};

export const dismissToast = (id: UUID) => {
  const t = toasts.get(id);
  if (!t) return;
  clearTimeout(t.timeoutID);
  toasts.delete(id);
};
