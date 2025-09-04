<script lang="ts">
  import { addToast } from './global.svelte';
  import { htmlToMarkdown } from '../modules/between-md-and-html';

  let htmlText = $state('');
  const promise = $derived(htmlToMarkdown(htmlText));

  $effect(() => {
    promise.catch((e) => console.log(e));
  });
</script>

<section aria-labelledby="html-to-md">
  <h2 id="html-to-md" class="text-center my-8">HTML to Markdown</h2>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col items-center gap-2">
      <label for="input-htom" class="text-xl font-serif">HTML</label>
      <textarea id="input-htom" bind:value={htmlText}></textarea>
    </div>
    <p class="self-center text-xl">↓↓↓</p>
    {#await promise then parsedMarkdown}
      <div class="flex flex-col items-center gap-2">
        <label for="output-htom" class="text-xl font-serif">
          Parsed Markdown
        </label>
        <textarea id="output-htom" value={parsedMarkdown} readonly></textarea>
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
    {:catch}
      <p class="text-center">error</p>
    {/await}
  </div>
</section>
