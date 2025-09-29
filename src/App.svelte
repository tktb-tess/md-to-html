<script lang="ts">
  import Toast from './lib/components/toast.svelte';
  import MdToHtml from './lib/components/mdToHtml.svelte';
  import HtmlToMd from './lib/components/htmlToMd.svelte';
  type Mode = 'md-to-html' | 'html-to-md';
  let mode: Mode = $state('md-to-html');
  const title = 'HTML ⇄ Markdown';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Toast />
<main class="">
  <h1 class="text-4xl lg:text-5xl font-extralight text-center my-12">
    {title}
  </h1>
  <div class="flex justify-center">
    <a href="../" class="btn-theme-1 font-normal">戻る</a>
  </div>
  <p class="text-center">Select a mode</p>
  <div class="flex justify-center gap-4">
    <button
      type="button"
      class="btn-theme-1"
      onclick={() => {
        mode = 'md-to-html';
      }}
    >
      Markdown to HTML
    </button>
    <button
      type="button"
      class="btn-theme-1"
      onclick={() => {
        mode = 'html-to-md';
      }}
    >
      HTML to Markdown
    </button>
  </div>

  {#if mode === 'md-to-html'}
    <MdToHtml />
  {:else}
    <HtmlToMd />
  {/if}
</main>
<div class="h-30"></div>
