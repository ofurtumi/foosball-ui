<script lang="ts">
  let { count = $bindable(0) } = $props();
  const increment = () => {
    count += 1;
  };

  const decrement = () => {
    if (count === 0) return;
    count -= 1;
  };
</script>

<div>
  <button onclick={increment}> + </button>
  <span>{count}</span>
  <button onclick={decrement}>-</button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--green-3);
    border: none;
    padding: 0.5rem;
    border-radius: 0.25rem;
    aspect-ratio: 1;
    width: 2rem;
    cursor: pointer;
  }

  span {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    width: 2rem;
  }
</style>
