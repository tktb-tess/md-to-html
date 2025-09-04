<script lang="ts">
  import { markdownToHtml } from '../modules/between-md-and-html';
  import { addToast } from './global.svelte';

  let markdownText = $state('');
  const promise = $derived(markdownToHtml(markdownText));

  $effect(() => {
    promise.catch((e) => console.error(e));
  });
</script>

<section aria-labelledby="md-to-html">
  <h2 id="md-to-html" class="text-center my-8">Markdown to HTML</h2>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col items-center gap-2">
      <label for="input-mtoh" class="text-xl font-serif">Markdown</label>
      <textarea id="input-mtoh" bind:value={markdownText}></textarea>
    </div>
    <p class="self-center text-xl">↓↓↓</p>
    {#await promise then parsedHtml}
      <div class="flex flex-col items-center gap-2">
        <label for="output-mtoh" class="text-xl font-serif">Parsed HTML</label>
        <textarea id="output-mtoh" value={parsedHtml} readonly></textarea>
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
    {:catch}
      <p class="text-center">error</p>
    {/await}
  </div>
</section>
