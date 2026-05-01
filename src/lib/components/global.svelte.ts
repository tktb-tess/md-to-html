import { SvelteMap } from 'svelte/reactivity';

export type ToastType = 'info' | 'warning' | 'caution' | 'ok';

interface Toast {
  text: string;
  duration: number;
  type: ToastType;
  timeoutID: ReturnType<typeof setTimeout>;
}

const count = new Uint32Array(1);
declare const __BRAND__: unique symbol;

type ID = string & { readonly [__BRAND__]: unknown };

const getId = () => {
  const s = `${count[0]!++}`;
  return s as ID;
};

export const toasts = new SvelteMap<ID, Toast>();

export const addToast = (text: string, duration: number, type: ToastType) => {
  const id = getId();

  const timeoutID = setTimeout(() => {
    dismissToast(id);
  }, duration);

  toasts.set(id, { text, duration, timeoutID, type });
};

export const dismissToast = (id: ID) => {
  const t = toasts.get(id);
  if (!t) return;
  clearTimeout(t.timeoutID);
  toasts.delete(id);
};
