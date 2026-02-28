import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const target = document.getElementById('app');

if (!(target instanceof HTMLDivElement)) {
  throw Error('!', { cause: Object.prototype.toString.call(target) });
}

const app = mount(App, {
  target,
});

export default app;
