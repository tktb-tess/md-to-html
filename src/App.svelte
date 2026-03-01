<script lang="ts">
  import Toast from './lib/components/toast.svelte';
  import MdToHtml from './lib/components/mdToHtml.svelte';
  import HtmlToMd from './lib/components/htmlToMd.svelte';
  import { texts } from './lib/components/global.svelte';
  import * as v from 'valibot';
  import { onMount } from 'svelte';
  type Mode = 'md-to-html' | 'html-to-md';
  let mode: Mode = $state('md-to-html');
  const title = 'HTML ⇄ Markdown';
  const subTitle = 'HTML と Markdown の変換';
  const key = 'inputs';

  const schema = v.object({
    mtohInput: v.string(),
    htomInput: v.string(),
  });

  onMount(() => {
    const val = window.localStorage.getItem(key);
    if (!val) return;
    try {
      const res = v.safeParse(schema, JSON.parse(val));
      if (!res.success) return;
      texts.htomInput = res.output.htomInput;
      texts.mtohInput = res.output.mtohInput;
    } catch (e) {
      console.error(e);
    }
  });

  $effect(() => {
    window.localStorage.setItem('inputs', JSON.stringify(texts));
  });
</script>

<svelte:head>
  <title>{title} | {subTitle}</title>
</svelte:head>

<Toast />
<div class="__container">
  <header>
    <hgroup class="__title">
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </hgroup>
  </header>
  <main>
    <div class="__prev-link">
      <a href="/" class="g__btn-theme-1">戻る</a>
    </div>
    <section class="__select-mode" aria-labelledby="select-a-mode">
      <h2 id="select-a-mode">Select a mode</h2>
      <div class="__btns">
        <button
          class="g__btn-theme-1"
          onclick={(ev) => {
            ev.preventDefault();
            mode = 'md-to-html';
          }}
        >
          Markdown → HTML
        </button>
        <button
          class="g__btn-theme-1"
          onclick={(ev) => {
            ev.preventDefault();
            mode = 'html-to-md';
          }}
        >
          HTML → Markdown
        </button>
      </div>
    </section>
    {#if mode === 'md-to-html'}
      <MdToHtml />
    {:else}
      <HtmlToMd />
    {/if}
  </main>
</div>

<style lang="postcss">
  @reference './app.css';
  @layer components {
    .__title {
      @apply flex flex-col gap-2 my-heading items-center *:max-w-full *:m-0 text-balance;
    }

    main {
      @apply text-center pb-36;
    }

    .__prev-link {
      @apply flex justify-center mt-paragraph;
    }

    .__select-mode .__btns {
      @apply flex justify-center gap-4 mt-paragraph flex-wrap;
    }
  }
</style>
