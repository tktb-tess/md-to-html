
<script lang="ts">
  import { toasts, dismissToast } from './global.svelte';
  const {}: {} = $props();
</script>

{#if toasts.size > 0}
  <div class="__toast-root">
    {#each toasts as [key, toast] (key)}
      <div
        class="__toast-elem {(() => {
          switch (toast.type) {
            case 'info': {
              return 'bg-blue-600';
            }
            case 'warning': {
              return 'bg-red-600';
            }
            case 'caution': {
              return 'bg-yellow-600';
            }
            case 'ok': {
              return 'bg-green-600';
            }
          }
        })()}"
      >
        <p>{toast.text}</p>
        <button
          aria-label="通知を閉じる"
          class="__dismiss-btn"
          onclick={(ev) => {
            ev.preventDefault();
            dismissToast(key);
          }}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    {/each}
  </div>
{/if}

<style lang="postcss">
  @reference '../../app.css';
  @layer components {
    .__toast-root {
      @apply fixed z-toast inset-0 flex flex-col gap-2 py-2 items-center *:max-w-full pointer-events-none;
    }

    .__toast-elem {
      @apply max-w-120 w-[calc(100%-2rem)] grid gap-2 p-4 animate-toast pointer-events-auto cbg-main rounded leading-none border text-white;
      grid-template-columns: auto 1rem;

      p {
        @apply m-0;
      }
    }

    .__dismiss-btn {
      @apply grid place-content-center;

      > * {
        @apply col-span-full row-span-full w-4 border-b-2 border-current;
      }

      > :first-child {
        @apply rotate-45;
      }

      > :last-child {
        @apply -rotate-45;
      }
    }
  }
</style>
