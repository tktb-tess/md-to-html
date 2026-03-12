<script lang="ts">
  import { addToast } from './global.svelte';
  import type { Processor } from '../modules/mtoh.svelte';
  import { onMount } from 'svelte';

  let input = $state('');
  let output = $state('');
  const name = 'md-to-html';
  const key = 'htom_input';
  let processor: Processor | null = null;
  let timeoutID: number | null = null;

  const setProcessor = async () => {
    const { createMtoHProcessor } = await import('../modules/mtoh.svelte');
    return createMtoHProcessor();
  };

  const convert = async () => {
    if (!processor) {
      processor = await setProcessor();
    }
    const v = await processor.process(input);
    output = v.toString();
    timeoutID = null;
  };

  onMount(() => {
    const v = localStorage.getItem(key);
    if (v != null) {
      input = v;
    }

    timeoutID = setTimeout(convert, 500);

    return () => {
      if (timeoutID != null) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
    };
  });
</script>

<section aria-labelledby={name}>
  <h2 id={name}>Markdown → HTML</h2>
  <div class="__area-1">
    <label for="{name}-input">Markdown</label>
    <textarea
      id="{name}-input"
      bind:value={
        () => input,
        (v) => {
          input = v;

          if (timeoutID != null) {
            clearTimeout(timeoutID);
            timeoutID = null;
          }

          timeoutID = setTimeout(async () => {
            if (input) {
              localStorage.setItem(key, input);
            } else {
              localStorage.removeItem(key);
            }
            await convert();
          }, 500);
        }
      }
    ></textarea>
  </div>
  <button
    class="btn-theme-1 __btn"
    onclick={(ev) => {
      ev.preventDefault();
      input = '';

      if (timeoutID != null) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }

      timeoutID = setTimeout(async () => {
        localStorage.removeItem(key);
        await convert();
      }, 500);
    }}
  >
    消去
  </button>
  <p>↓↓↓</p>
  <div class="__area-1">
    <label for="{name}-parsed">Parsed HTML</label>
    <textarea id="{name}-parsed" value={output} readonly></textarea>
  </div>
  <button
    class="btn-theme-1 __btn"
    onclick={(ev) => {
      ev.preventDefault();
      navigator.clipboard.writeText(output).then(
        () => addToast('Successfully copied!', 3000, 'info'),
        (e) => {
          console.error(e);
          addToast('Failed to copy', 3000, 'warning');
        },
      );
    }}
  >
    クリップボードにコピー
  </button>
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
