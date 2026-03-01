<svelte:options runes={true} />

<script lang="ts">
  import { toasts, dismissToast, type ToastType } from './global.svelte';

  const determineColor = (type: ToastType) => {
    switch (type) {
      case 'info': {
        return 'border-sky-500';
      }
      case 'warning': {
        return 'border-red-500';
      }
      case 'caution': {
        return 'border-yellow-500';
      }
      case 'ok': {
        return 'border-green-500';
      }
    }
  };
</script>

{#if toasts.size > 0}
  <div class="__toast-root">
    {#each toasts as [key, toast]}
      <div class="__toast-elem {determineColor(toast.type)}">
        <p class="m-0 text-xl">{toast.text}</p>
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
      @apply fixed z-10000 top-5 left-0 right-0 flex flex-col gap-2 items-center *:max-w-full pointer-events-none;
    }

    .__toast-elem {
      @apply flex gap-2 px-2 animate-toast relative pointer-events-auto cbg-main rounded border-2;
    }

    .__dismiss-btn {
      @apply grid place-items-center;

      > * {
        @apply col-span-full row-span-full w-4 border-b border-current;
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
