<script lang="ts">
  import { addToast } from './global.svelte';
  import { onMount } from 'svelte';

  let input = $state('');
  let output = $state('');
  
  const name = 'html-to-md';
  const key = 'mtoh_input';
  const delay = 500;
  let timeoutID: ReturnType<typeof setTimeout> | null = null;

  const getProcessor = async () => {
    const { processor } = await import('../modules/htom');
    return processor;
  };

  onMount(() => {
    const v = localStorage.getItem(key);
    if (v != null) {
      input = v;
    }

    if (input) {
      timeoutID = setTimeout(async () => {
        const p = await getProcessor();
        const v = await p.process(input);
        output = v.toString();
        timeoutID = null;
      }, delay);
    }

    return () => {
      if (timeoutID != null) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
    };
  });
</script>

<section aria-labelledby={name}>
  <h2 id={name}>HTML → Markdown</h2>
  <div class="__area-1">
    <label for="{name}-input">HTML</label>
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
            const p = await getProcessor();
            const v = await p.process(input);
            output = v.toString();
            timeoutID = null;
          }, delay);
        }
      }
    ></textarea>
  </div>
  <button
    class="__btn"
    onclick={(ev) => {
      ev.preventDefault();
      input = '';

      if (timeoutID != null) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }

      timeoutID = setTimeout(async () => {
        localStorage.removeItem(key);
        const p = await getProcessor();
        const v = await p.process(input);
        output = v.toString();
        timeoutID = null;
      }, 500);
    }}
  >
    消去
  </button>
  <p>↓↓↓</p>
  <div class="__area-1">
    <label for="{name}-parsed">Parsed Markdown</label>
    <textarea id="{name}-parsed" value={output} readonly></textarea>
  </div>
  <button
    class="__btn"
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
      @apply flex flex-col gap-1 inline-full mbs-paragraph;
    }

    .__btn {
      @apply mbs-paragraph btn-theme-1;
    }
  }
</style>
