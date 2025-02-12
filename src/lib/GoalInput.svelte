<script lang="ts">
  let { score = $bindable(), disabled = false } = $props();
</script>

<div class="score-container">
  {#each Array.from({ length: 10 }) as _, i}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      {disabled}
      onclick={() => {
        if (score === i + 1) score = i;
        else score = i + 1;
      }}
      class:selected={i < score}
    ></button>
  {/each}
</div>

<style>
  .score-container {
    width: full;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    aspect-ratio: 1;
    max-height: 3rem;

    @media screen and (max-width: 438px) {
      height: 1.25rem;
    }
  }

  .selected {
    background: var(--color);
  }
</style>
