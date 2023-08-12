<script lang="ts">
  import { pageToShow, settings } from '$lib/stores';
  import { get } from 'svelte/store';

  const displayedSettings: DisplayedSetting[] = [
    {
      title: 'Low Data Mode',
      description: `Blocks media from sources other than the installed app on your system.
So media installed with the app are shown but not media from the internet.`,
      settingsStoreKey: 'lowDataMode',
    },
  ];
</script>

<h1>Settings</h1>

{#each displayedSettings as { settingsStoreKey, title, description }}
  {#if typeof $settings[settingsStoreKey] === 'boolean'}
    <div class="flex ml-4">
      <div>
        <h2><label for={settingsStoreKey}>{title}</label></h2>
        {#if description}
          <p class="ml-4 whitespace-pre-wrap">{description}</p>
        {/if}
      </div>
      <div class="flex-1">
        <input
          id={settingsStoreKey}
          checked={get(settings)[settingsStoreKey]}
          type="checkbox"
          on:input={(event) => {
            settings.update((settings) => {
              settings[settingsStoreKey] = event.currentTarget.checked;
              localStorage.setItem('settings', JSON.stringify(settings));
              return settings;
            });
          }}
        />
      </div>
    </div>
  {/if}
{/each}

<button on:click={() => pageToShow.set('main')}>Leave</button>
