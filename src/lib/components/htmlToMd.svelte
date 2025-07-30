<script lang="ts">
  import TurndownService from '@joplin/turndown';
  import { addToast } from './global.svelte';
  import { gfm } from '@joplin/turndown-plugin-gfm';
  const service = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  service.use(gfm);
  let htmlText = $state('');
  const parsedMarkdown = $derived(service.turndown(htmlText));
</script>

<section aria-labelledby="html-to-md">
  <h2 id="html-to-md" class="text-center my-8">HTML to Markdown</h2>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col items-center gap-2">
      <label for="input-htom" class="text-xl font-serif">Markdown</label>
      <textarea id="input-htom" bind:value={htmlText}></textarea>
    </div>
    <p class="self-center text-xl">↓↓↓</p>
    <div class="flex flex-col items-center gap-2">
      <label for="output-htom" class="text-xl font-serif">Parsed HTML</label>
      <textarea id="output-htom" readonly>{parsedMarkdown}</textarea>
      <button
        class="my-5 btn-theme-1"
        type="button"
        onclick={() => {
          navigator.clipboard
            .writeText(parsedMarkdown)
            .then(() => {
              addToast('successfully copied!', 5000, 'info');
            })
            .catch(() => {
              addToast('failed to copy', 5000, 'warning');
            });
        }}
      >
        Copy to clipboard
      </button>
    </div>
  </div>
</section>
