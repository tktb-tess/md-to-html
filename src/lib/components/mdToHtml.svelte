<script lang="ts">
  import { onMount } from 'svelte';
  import { addToast } from './global.svelte';
  import { texts } from './global.svelte';

  let markdownToHtml: ((markdown: string) => Promise<string>) | undefined =
    $state();

  const promise = $derived(markdownToHtml?.(texts.mtohInput));
  const name = 'md-to-html';

  onMount(async () => {
    const mod = await import('../modules/mtoh');
    markdownToHtml = mod.mdToHtml;
  });

  $effect(() => {
    promise?.catch((e) => console.error(e));
  });
</script>

<section aria-labelledby={name}>
  <h2 id={name}>Markdown → HTML</h2>
  <div class="__area-1">
    <label for="{name}-input">Markdown</label>
    <textarea id="{name}-input" bind:value={texts.mtohInput}></textarea>
  </div>
  <button
    class="btn-theme-1 __btn"
    onclick={(ev) => {
      ev.preventDefault();
      texts.mtohInput = '';
    }}
  >
    消去
  </button>
  <p>↓↓↓</p>
  {#if promise}
    {#await promise then parsedHtml}
      <div class="__area-1">
        <label for="{name}-parsed">Parsed HTML</label>
        <textarea id="{name}-parsed" value={parsedHtml} readonly></textarea>
      </div>
      <button
        class="btn-theme-1 __btn"
        onclick={(ev) => {
          ev.preventDefault();
          navigator.clipboard.writeText(parsedHtml).then(
            () => addToast('Successfully copied!', 3000, 'info'),
            () => addToast('Failed to copy', 3000, 'warning'),
          );
        }}
      >
        クリップボードにコピー
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
