<script lang="ts">
  import { onMount } from "svelte";
  import {
    getAllGames,
    getAllStats,
    getAllUsers,
    getPlayerByIdStats,
    type ExtendedStatResponse,
    type GetAllGamesResponse,
    type GetAllStatsResponse,
    type GetAllUsersResponse,
    type GetPlayerByIdStatsResponse,
  } from "./lib/api";
  import GoalInput from "./lib/GoalInput.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import StatModal from "./lib/StatModal.svelte";
  import CreationMenu from "./lib/CreationMenu.svelte";
  import GameOverview from "./lib/GameOverview.svelte";
  import Navigation from "./lib/Navigation.svelte";
  import { PAGE } from "./lib/types";
  import Leaderboard from "./lib/Leaderboard.svelte";

  let users: GetAllUsersResponse = $state([]);
  let games: GetAllGamesResponse = $state([]);
  let stats: Record<string, GetPlayerByIdStatsResponse> = $state({});

  let currentPage = $state(PAGE.GAMES);
  let allGameStats: ExtendedStatResponse = $state([]);

  onMount(async () => {
    toast.promise(getData(), {
      loading: "Loading data...",
      success: "Data loaded!",
      error: "Failed to load data",
    });
  });

  const getData = async () => {
    if (users.length === 0) users = await getAllUsers();
    if (allGameStats.length === 0)
      allGameStats = await getAllStats().then((res) =>
        res.map((stat) => ({
          name: users.find((user) => user.id === stat.playerId)?.name ?? "",
          winPercentage: Math.round((stat.gamesWon / stat.totalGames) * 100),
          ...stat,
        }))
      );
    games = await getAllGames().then(data => data.reverse());
  };
</script>

<main>
  <Toaster />

  <Navigation bind:currentPage />

  <CreationMenu
    {users}
    toastCallback={(
      func: () => Promise<unknown>,
      statuses: { loading: string; success: string; error: string }
    ) => toast.promise(func(), statuses)}
    {getData}
  />

  {#if currentPage === PAGE.GAMES}
    <GameOverview {games} {users} {stats} />
  {:else if currentPage === PAGE.LEADERBOARD}
    <Leaderboard  bind:allGameStats />
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr;
    place-content: start;
    background: var(--green-1);
  }

  @media (max-width: 768px) {
    main {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
    }
  }
</style>
