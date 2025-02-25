<script lang="ts">
  import { X } from "lucide-svelte";
  import type { GetPlayerByIdStatsResponse } from "./api";
  let {
    name,
    stats,
    team,
    getStats,
  }: {
    name: string;
    stats: GetPlayerByIdStatsResponse;
    team: "red" | "blue";
    getStats: (name: string) => Promise<GetPlayerByIdStatsResponse>;
  } = $props();

  let dialog = $state<HTMLDialogElement | null>(null);

  let win_percent = $state(0);
  let loss_percent = $state(0);

  const showModal = () => {
    if (stats) {
      dialog?.showModal();
    } else {
      dialog?.showModal();
      getStats(name).then((newStats) => {
        stats = newStats;
        win_percent = (stats.wins / stats.totalGames) * 100;
        loss_percent = 100 - win_percent;
      });
    }
  };
</script>

<div class="stat-modal">
  <button class={team} onclick={showModal}>{name}</button>
  <dialog bind:this={dialog}>
    <div class="top-bar">
      <h2>{name}</h2>
      <button onclick={() => dialog?.close()}>
        <X />
      </button>
    </div>
    <div class="content">
      {#if stats}
        <h2>Total Games: {stats.totalGames}</h2>

        <div class="percentage-holder">
          <div
            class="percentage"
            style="--win-percentage: {(stats.wins / stats.totalGames) *
              100}%; --counted-percentage: var(--green-1); --filler-percentage: var(--green-2);"
          >
            <h3>Won: {stats.wins} ({win_percent.toFixed(2)}%)</h3>
            <h3>Lost: {stats.losses} ({loss_percent.toFixed(2)}%)</h3>
          </div>

          <div
            class="percentage"
            data-win={(stats.howOftenRed / stats.totalGames) * 100}
            style="--win-percentage: {(stats.howOftenRed / stats.totalGames) *
              100}%; --counted-percentage: var(--red-1); --filler-percentage: var(--blue-1);"
          >
            <h2>Games as</h2>
            <h3>
              Red: {stats.howOftenRed}, ({stats.winsAsRed} win{stats.winsAsRed !==
              1
                ? "s"
                : ""})
            </h3>
            <h3>
              Blue: {stats.howOftenBlue}, ({stats.winsAsBlue} win{stats.winsAsBlue !==
              1
                ? "s"
                : ""})
            </h3>
          </div>
        </div>
      {:else}
        <h2>Loading...</h2>
      {/if}
    </div>
  </dialog>
</div>

<style>
  @property --offset {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }

  @property --win-recentage {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }

  .stat-modal > button {
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .blue {
    background: var(--blue-1);
  }

  .red {
    background: var(--red-1);
  }

  ::backdrop {
    background-image: linear-gradient(
      45deg,
      var(--green-1),
      var(--green-2),
      var(--green-3)
    );
    opacity: 0.75;
  }

  dialog {
    width: 32rem;
    flex-direction: column;
    border-radius: 1rem;
    border: none;
    background: var(--green-3);
    box-shadow:
      0 0 #0000,
      0 0 #0000,
      0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  dialog[open] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;

    border-bottom: 1px dotted var(--green-1);

    > * {
      padding: 0;
      width: fit-content;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transition: height 0.2s ease;
  }

  .percentage-holder {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    flex: 1;
  }

  @keyframes fill_percentage {
    to {
      --offset: var(--win-percentage);
    }
  }

  .percentage {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    --counted-percentage: red;
    --filler-percentage: blue;
    --offset: 0%;

    &::after {
      content: "";
      inset: 0;
      position: absolute;
      border-radius: 50%;
      background-image: conic-gradient(
        var(--counted-percentage) var(--offset),
        var(--filler-percentage) 0deg
      );
      mask-image: radial-gradient(transparent 50%, black 50%);
      transition: --offset 0.5s ease;
      /* transition-delay: 2.3s; */

      animation: fill_percentage 1.5s ease forwards;

      /* @keyframes fill_percentage {
        to {
          --offset: 90%;
        }
      } */
    }

    &:hover::after {
      /* animation: fill_percentage 0.2s ease forwards; */
      --offset: var(--win-percentage);
    }
  }

  @media (max-width: 768px) {
    dialog {
      font-size: 0.65rem;
    }
  }
</style>
