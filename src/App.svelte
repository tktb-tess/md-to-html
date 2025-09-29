<script lang="ts">
  import Toast from './lib/components/toast.svelte';
  import MdToHtml from './lib/components/mdToHtml.svelte';
  import HtmlToMd from './lib/components/htmlToMd.svelte';
</script>

<Toast />
<main class="">
  <h1 class="text-4xl lg:text-5xl font-extralight text-center my-12">HTML ↔ Markdown</h1>
  <div class="flex justify-center">
    <a href="../" class="btn-theme-1 font-normal">戻る</a>
  </div>
  <MdToHtml />
  <HtmlToMd />
</main>
<div class="h-30"></div>