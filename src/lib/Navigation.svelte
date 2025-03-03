<script lang="ts">
  import { PAGE } from "./types";

  let { currentPage = $bindable() }: { currentPage: PAGE } = $props();

  const changePage = (page: PAGE) => {
    if (currentPage === page) return;
    currentPage = page;
  };
</script>

<nav>
  <h1>Júní Foosball</h1>
  <div>
    <button
      onclick={() => changePage(PAGE.GAMES)}
      class:selected={currentPage === PAGE.GAMES}>All games</button
    >
    <button
      onclick={() => changePage(PAGE.LEADERBOARD)}
      class:selected={currentPage === PAGE.LEADERBOARD}>Leaderboard</button
    >
  </div>
</nav>

<style>
  nav {
    display: flex;
    grid-column: span 2;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin: 0.5rem;
    margin-bottom: 0;
    border-radius: 0.5rem;
    background: var(--green-2);
    height: fit-content;
  }

  nav > div {
    display: flex;
    gap: 1rem;
  }

  .selected {
    background: var(--green-1);
  }
</style>
