<script lang="ts">
  import Toast from './lib/components/toast.svelte';
  import MdToHtml from './lib/components/mdToHtml.svelte';
  import HtmlToMd from './lib/components/htmlToMd.svelte';
</script>

<Toast />
<main class="mx-4 flex flex-col bg-slate-50">
  <MdToHtml />
  <HtmlToMd />
</main>
