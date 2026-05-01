<script lang="ts">
  import '../app.css';
  import Toast from '$lib/components/toast.svelte';
  import MdToHtml from '$lib/components/mdToHtml.svelte';
  import HtmlToMd from '$lib/components/htmlToMd.svelte';

  type Mode = 'md-to-html' | 'html-to-md';
  const title = 'HTML ⇄ Markdown';
  const subTitle = 'HTML と Markdown の変換';
  let mode: Mode = $state('md-to-html');
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
      <a href="https://tktb-tess.github.io">戻る</a>
    </div>
    <section class="__select-mode" aria-labelledby="select-a-mode">
      <h2 id="select-a-mode" class="text-xl">Select a mode</h2>
      <div class="btn-group">
        <div class="btn-item">
          <input
            id="mode-mtoh"
            type="radio"
            name="mode"
            checked={mode === 'md-to-html'}
            onclick={() => {
              mode = 'md-to-html';
            }}
          />
          <label for="mode-mtoh">Markdown → HTML</label>
        </div>
        <div class="btn-item">
          <input
            id="mode-htom"
            type="radio"
            name="mode"
            checked={mode === 'html-to-md'}
            onclick={() => {
              mode = 'html-to-md';
            }}
          />
          <label for="mode-htom">HTML → Markdown</label>
        </div>
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
  @reference '../app.css';

  @layer components {
    .__title {
      @apply flex flex-col gap-2 my-heading items-center *:max-inline-full *:m-0 text-balance;
    }

    main {
      @apply text-center pbe-36;
    }

    .__prev-link {
      @apply flex justify-center mt-paragraph;

      > a {
        @apply btn-theme-1;
      }
    }

    .btn-group {
      @apply flex justify-center gap-4 mt-paragraph flex-wrap;

      .btn-item {
        @apply block;

        > input {
          @apply appearance-none sr-only;
        }

        > label {
          @apply block cursor-pointer btn-theme-1;
        }

        > input:checked + label {
          @apply bg-accent text-textinv;
        }

        > input:focus-visible + label {
          @apply outline outline-text;
        }
      }
    }
  }
</style>
