declare module '@joplin/turndown' {
  export { default } from 'turndown';
}

declare module '@joplin/turndown-plugin-gfm' {
  import TurndownService from 'turndown';
  export const gfm: (service: TurndownService) => void;
}
