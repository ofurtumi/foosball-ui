<script lang="ts">
  import {
    getPlayerByIdStats,
    type GetAllGamesResponse,
    type GetAllUsersResponse,
    type GetPlayerByIdStatsResponse,
  } from "./api";
  import GoalInput from "./GoalInput.svelte";
  import StatModal from "./StatModal.svelte";

  let {
    games,
    stats,
    users,
  }: {
    games: GetAllGamesResponse;
    users: GetAllUsersResponse;
    stats: Record<string, GetPlayerByIdStatsResponse>;
  } = $props();

  const fancy_date = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getAndSetPlayerStats = async (player: string) => {
    if (stats[player]) return stats[player];

    const player_id = users.find((user) => user.name === player)?.id!;
    const data = await getPlayerByIdStats(player_id);
    stats[player] = data;
    return data;
  };
</script>

<div class="game-container">
  {#await games}
    <h2>Loading games...</h2>
  {:then games}
    {#each games as game}
      <div class="game">
        <span>{fancy_date(game.date)}</span>
        <div class="red">
          <div>
            <GoalInput
              score={game.teamRedScore}
              --color="var(--red-1)"
              disabled
            />
            <span class="desktop-counter">{game.teamRedScore}</span>
          </div>

          <ul>
            {#each game.players.filter((player) => player.team === "RED") as player}
              <li>
                <StatModal
                  name={player.name}
                  team="red"
                  stats={stats[player.name]}
                  getStats={getAndSetPlayerStats}
                />
              </li>
            {/each}
          </ul>
        </div>
        <div class="blue">
          <div>
            <GoalInput
              score={game.teamBlueScore}
              --color="var(--blue-1)"
              disabled
            />
            <span class="desktop-counter">{game.teamBlueScore}</span>
          </div>

          <ul>
            {#each game.players.filter((player) => player.team === "BLUE") as player}
              <li>
                <StatModal
                  name={player.name}
                  team="blue"
                  stats={stats[player.name]}
                  getStats={getAndSetPlayerStats}
                />
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  {/await}
</div>

<style>
  .blue {
    background: var(--blue-1);
  }

  .red {
    background: var(--red-1);
  }

  .game-container {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: scroll;
  }

  .game {
    background: var(--green-2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.5rem;

    & div {
      background: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      & ul {
        display: flex;
        gap: 0.5rem;

        & li button {
          padding: 0.5rem;
          border-radius: 0.25rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    main {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
    }

    .game-container {
      overflow-y: visible;
    }

    .desktop-counter {
      display: none;
    }

    .game div {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
