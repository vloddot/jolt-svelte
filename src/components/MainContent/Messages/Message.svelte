<script lang="ts">
  import { unified } from 'unified';
  import remarkParse from 'remark-parse';
  import remarkBreaks from 'remark-breaks';
  import remarkGfm from 'remark-gfm';
  import remarkMath from 'remark-math';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';
  import rehypePrism from 'rehype-prism';
    import { fetchUser } from '$lib/helpers';

  const parser = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrism, { plugins: ['line-numbers'] })
    .use(rehypeStringify);

  export let message: Message;
</script>

{#await fetchUser(message.author) then author}
  <span class="opacity-60">{author.username}</span>
{/await}
{#await parser.process(message.content) then content}
  {@html content}
{/await}
