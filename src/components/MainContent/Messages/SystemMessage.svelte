<script lang="ts">
  import { fetchUser, getAutumnURL, getDefaultUserAvatar } from '$lib/util';
  import { _ } from 'svelte-i18n';

  export let system: SystemMessage;
</script>

{#if system.type === 'text'}
  {system.content}
{:else if system.type === 'channel_description_changed' || system.type === 'channel_icon_changed' || system.type === 'channel_renamed' || system.type === 'user_added' || system.type === 'user_remove'}
  {#await fetchUser(system.by) then by}
    <img
      src={by.avatar === undefined ? getDefaultUserAvatar(by._id) : getAutumnURL(by.avatar)}
      alt={by.username}
    />
    {by.username}
    {#if system.type === 'channel_description_changed'}
      {$_('channel.description.change')}.
    {:else if system.type === 'channel_icon_changed'}
      {$_('channel.icon.change')}.
    {:else if system.type === 'channel_renamed'}
      {$_('channel.rename-to')} {system.name}.
    {:else if system.type === 'user_added' || system.type === 'user_remove'}
      {#await fetchUser(system.id) then user}
        {#if system.type === 'user_added'}
          {$_('added')} {user.username}.
        {:else if system.type === 'user_remove'}
          {$_('removed')} {user.username}.
        {/if}
      {/await}
    {/if}
  {/await}
{:else if system.type === 'channel_ownership_changed'}
  {#await Promise.all([fetchUser(system.from), fetchUser(system.to)]) then [from, to]}
    {$_('channel.ownership.changed-from')} {from.username} to {to.username}
  {/await}
{:else if system.type === 'user_banned' || system.type === 'user_joined' || system.type === 'user_kicked' || system.type === 'user_left'}
  {#await fetchUser(system.id) then user}
    {user.username}
    {#if system.type === 'user_banned'}
      {$_('user.was-banned')}.
    {:else if system.type === 'user_joined'}
      {$_('user.chat.joined')}.
    {:else if system.type === 'user_kicked'}
      {$_('user.was-kicked')}.
    {:else if system.type === 'user_left'}
      {$_('user.chat.left')}.
    {/if}
  {/await}
{/if}
