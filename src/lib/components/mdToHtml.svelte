<script lang="ts">
  import { marked } from 'marked';
  import { addToast } from './global.svelte';

  let markdownText = $state('');
  const parsedHtml = $derived(marked.parse(markdownText, { async: false }));
</script>

<section aria-labelledby="md-to-html">
  <h2 id="md-to-html" class="text-center my-8">Markdown to HTML</h2>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col items-center gap-2">
      <label for="input" class="text-xl font-serif">Markdown</label>
      <textarea id="input" bind:value={markdownText}></textarea>
    </div>
    <p class="self-center text-xl">↓↓↓</p>
    <div class="flex flex-col items-center gap-2">
      <label for="output" class="text-xl font-serif">Parsed HTML</label>
      <textarea id="output" readonly>{parsedHtml}</textarea>
      <button
        class="my-5 btn-theme-1"
        type="button"
        onclick={() => {
          navigator.clipboard
            .writeText(parsedHtml)
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
