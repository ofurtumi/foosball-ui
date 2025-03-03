<script lang="ts">
  import {
    type ExtendedStatResponse,
  } from "./api";
  import Pedestal from "./Pedestal.svelte";

  let {
    allGameStats = $bindable(),
  }: {
    allGameStats: ExtendedStatResponse;
  } = $props();
</script>

<section class="leaderboard-container">
  {#await allGameStats}
    <h2>Loading leaderboard...</h2>
  {:then allGameStats}
    <Pedestal
      results={[...allGameStats]}
      sortby={"gamesWon"}
      title="Total wins"
    />
    <Pedestal
      results={[...allGameStats]}
      sortby={"winPercentage"}
      title="Win percentage"
      postfix="%"
    />
    <Pedestal
      results={[...allGameStats]}
      sortby={"totalGames"}
      title="Total games"
    />
  {/await}
</section>

<style>
  .leaderboard-container {
    background: var(--green-2);
    margin: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: start;
    gap: 2rem;
    overflow-y: scroll;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .leaderboard-container {    
      flex-direction: column;
      overflow-y: visible;
      justify-content: start;
      align-items: center;
    }
  }
</style>
