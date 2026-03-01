<script lang="ts">
  import { onMount } from 'svelte';
  import { addToast } from './global.svelte';
  import { texts } from './global.svelte';

  let htmlToMarkdown: ((html: string) => Promise<string>) | undefined =
    $state();

  const promise = $derived(htmlToMarkdown?.(texts.htomInput));
  const name = 'md-to-html';

  onMount(async () => {
    const mod = await import('../modules/htom');
    htmlToMarkdown = mod.htmlToMarkdown;
  });

  $effect(() => {
    promise?.catch((e) => console.log(e));
  });
</script>

<section aria-labelledby={name}>
  <h2 id={name}>HTML → Markdown</h2>
  <label class="__area-1" for="{name}-input">
    <span>HTML</span>
    <textarea id="{name}-input" bind:value={texts.htomInput}></textarea>
  </label>
  <button
    class="g__btn-theme-1 __btn"
    onclick={(ev) => {
      ev.preventDefault();
      texts.htomInput = '';
    }}
  >
    Delete
  </button>
  <p>↓↓↓</p>
  {#if promise}
    {#await promise then parsedHtml}
      <label class="__area-1" for="{name}-parsed">
        <span>Parsed Markdown</span>
        <textarea id="{name}-parsed" value={parsedHtml} readonly></textarea>
      </label>
      <button
        class="g__btn-theme-1 __btn"
        onclick={(ev) => {
          ev.preventDefault();
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
  {/if}
</section>

<style lang="postcss">
  @reference '../../app.css';
  @layer components {
    section {
      @apply text-center;
    }

    .__area-1 {
      @apply flex flex-col gap-1 w-full mt-paragraph;
    }

    .__btn {
      @apply mt-paragraph;
    }
  }
</style>
