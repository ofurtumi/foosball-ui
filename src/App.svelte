<script lang="ts">
  import { onMount } from "svelte";
  import {
    getAllGames,
    getAllUsers,
    getPlayerByIdStats,
    type GetAllGamesResponse,
    type GetAllUsersResponse,
    type GetPlayerByIdStatsResponse,
  } from "./lib/api";
  import GoalInput from "./lib/GoalInput.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import StatModal from "./lib/StatModal.svelte";
  import CreationMenu from "./lib/CreationMenu.svelte";
  import GameOverview from "./lib/GameOverview.svelte";

  let users: GetAllUsersResponse = $state([]);
  let games: GetAllGamesResponse = $state([]);
  let stats: Record<string, GetPlayerByIdStatsResponse> = $state({});

  onMount(async () => {
    toast.promise(getData(), {
      loading: "Loading data...",
      success: "Data loaded!",
      error: "Failed to load data",
    });
  });

  const getData = async () => {
    if (users.length === 0) users = await getAllUsers();
    games = await getAllGames();
  };
</script>

<main>
  <Toaster />

  <CreationMenu
    {users}
    toastCallback={(
      func: () => Promise<unknown>,
      statuses: { loading: string; success: string; error: string }
    ) => toast.promise(func(), statuses)}
    {getData}
  />

  <GameOverview {games} {users} {stats} />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
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
