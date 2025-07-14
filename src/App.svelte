<script lang="ts">
    import { marked } from 'marked';
    let markdownText = $state('');

    const parsedHtml = $derived(marked.parse(markdownText, { async: false }));
</script>

<main class="mx-2">
    <h1 class="text-center my-8">Markdown to HTML</h1>
    <div class="flex flex-col gap-3">
        <div class="flex flex-col items-center gap-2">
            <label for="input" class="text-xl font-serif">Markdown</label>
            <textarea id="input" bind:value={markdownText}></textarea>
        </div>
        <p class="self-center text-xl">↓↓↓</p>
        <div class="flex flex-col items-center gap-2">
            <label for="output" class="text-xl font-serif">Parsed HTML</label>
            <textarea id="output" readonly>{parsedHtml}</textarea>
            <button
                class="my-5"
                type="button"
                onclick={() => {
                    navigator.clipboard
                        .writeText(parsedHtml)
                        .then(() => {
                            alert('successfully copied!');
                        })
                        .catch(() => {
                            alert('failed to copy');
                        });
                }}
            >
                Copy to clipboard
            </button>
        </div>
    </div>
</main>
