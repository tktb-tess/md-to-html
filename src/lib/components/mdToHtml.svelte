<script lang="ts">
  import { onMount } from 'svelte';
  import { addToast } from './global.svelte';
  import { texts } from './global.svelte';

  onMount(async () => {
    const mod = await import('../modules/mtoh');
    markdownToHtml = mod.markdownToHtml;
  });

  let markdownToHtml: (markdown: string) => Promise<string> = $state(
    async () => '',
  );

  const promise = $derived(markdownToHtml(texts.mtohInput));
  const name = 'md-to-html';

  $effect(() => {
    promise.catch((e) => console.error(e));
  });
</script>

<section aria-labelledby={name}>
  <h2 id={name}>Markdown to HTML</h2>
  <label class="__area-1" for="{name}-input">
    <span>Markdown</span>
    <textarea id="{name}-input" bind:value={texts.mtohInput}></textarea>
  </label>
  <p>↓↓↓</p>
  {#await promise then parsedHtml}
    <label class="__area-1" for="{name}-parsed">
      <span>Parsed HTML</span>
      <textarea id="{name}-parsed" value={parsedHtml} readonly></textarea>
    </label>

    <button
      class="c__btn-theme-1"
      type="button"
      onclick={() => {
        navigator.clipboard.writeText(parsedHtml).then(
          () => addToast('Successfully copied!', 5000, 'info'),
          () => addToast('Failed to copy', 5000, 'warning'),
        );
      }}
    >
      Copy to clipboard
    </button>
  {:catch}
    <p>error</p>
  {/await}
</section>

<style lang="postcss">
  @reference '../../app.css';
  @layer components {
    section {
      @apply flex flex-col items-center *:max-w-full gap-2 **:m-0 text-center;
    }

    .__area-1 {
      @apply flex flex-col gap-1;
    }
  }
</style>
