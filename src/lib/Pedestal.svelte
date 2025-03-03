<script lang="ts">
  import type { ExtendedStatResponse } from "./api";

  let {
    results,
    sortby,
    title,
    postfix,
  }: {
    results: ExtendedStatResponse;
    sortby: keyof Omit<
      ExtendedStatResponse[number],
      "name" | "playerId" | "positionHistograms"
    >;
    title: string;
    postfix?: string;
  } = $props();

  const sorted = results.sort((a, b) => b[sortby] - a[sortby]);
</script>

{#await results}
  <h2>Loading data...</h2>
{:then}
  <div class="pedestal">
    <h2>{title}</h2>

    <div class="top-3">
      <div class="second">
        <span>{sorted[1].name}</span>
        <span>{sorted[1][sortby]}{postfix}</span>
      </div>
      <div class="first">
        <span>{sorted[0].name}</span>
        <span>{sorted[0][sortby]}{postfix}</span>
      </div>
      <div class="third">
        <span>{sorted[2].name}</span>
        <span>{sorted[2][sortby]}{postfix}</span>
      </div>
    </div>

    <ol class="table" start="4">
      {#each sorted.slice(3) as player}
        <li>
          <span>{player.name}</span>
          <span>{player[sortby]}{postfix}</span>
        </li>
      {/each}
    </ol>
  </div>
{/await}

<style>
  h2 {
    margin-bottom: 1rem;
  }

  .pedestal {
    min-width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top-3 {
    display: flex;
    height: 4rem;
    width: 100%;
    align-items: end;
    justify-content: space-between;

    div {
      padding: 0.25rem 0.5rem;
      justify-content: space-between;
      align-items: start;
      display: flex;
      width: 100%;
      color: var(--green-1);
      font-weight: bold;
    }

    .first {
      background: gold;
      height: 100%;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .second {
      background: silver;
      height: 75%;
      border-radius: 0.5rem 0 0 0;
    }

    .third {
      background: #cd7f32;
      height: 50%;
      border-radius: 0 0.5rem 0 0;
    }
  }

  ol {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0.25rem 0.5rem;
    background: var(--green-1);
    border-radius: 0 0 0.5rem 0.5rem;
  }

  li {
    list-style: decimal;
    list-style-position: inside;
    padding-inline-start: 0;
    display: list-item;
    padding: 0.5rem 0;

    &:not(:last-child) {
      border-bottom: var(--green-3) 1px solid;
    }

    & span:nth-child(2) {
      float: right;
    }
  }
</style>
