<script lang="ts">
  import { unified } from 'unified';
  import remarkParse from 'remark-parse';
  import remarkBreaks from 'remark-breaks';
  import remarkGfm from 'remark-gfm';
  import remarkMath from 'remark-math';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';
  import rehypePrism from 'rehype-prism';

  import { getAutumnURL } from '$lib/helpers';
  import { currentServerID } from '$lib/stores';

  const parser = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrism, { plugins: ['line-numbers'] })
    .use(rehypeStringify);

  export let users: User[];
  export let members: Member[];
  export let message: Message;
  $: author = users.find((user) => user._id === message.author);
  $: member = members.find(
    (member) => member._id.server === $currentServerID && member._id.user === author?._id
  );

  $: displayUsername = member?.nickname ?? author?.username ?? '<Unknown User>';
  $: displayAvatar = getAutumnURL(member?.avatar ?? author?.avatar);
</script>

<img alt={displayUsername} src={displayAvatar} width="24" height="24" class="rounded-3xl inline" />
{displayUsername}
{#await parser.process(message.content) then content}
  {@html content}
{/await}

{#if message.attachments}
  {#each message.attachments as attachment}
    <img src={getAutumnURL(attachment)} alt={attachment.filename} />
  {/each}
{/if}
