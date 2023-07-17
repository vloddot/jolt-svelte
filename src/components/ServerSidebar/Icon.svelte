<script lang="ts">
  import './index.css';

  export let name: string;
  export let icon: AutumnFile | undefined;
</script>

<div class="group m-0">
  <span class="sidebar-tooltip group-hover:scale-100">
    {name}
  </span>
  <span tabindex="0" role="link" on:click on:keydown>
    {#if icon === undefined}
      <span class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        >{name
          .split(' ')
          .slice(0, 2)
          .map((s) => s[0])
          .join('')}
      </span>
    {:else}
      <img
        class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
        src={`https://autumn.revolt.chat/${icon.tag}/${icon._id}`}
        alt={name}
      />
    {/if}
  </span>
</div>
