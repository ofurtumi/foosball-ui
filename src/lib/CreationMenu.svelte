<script lang="ts">
  import toast from "svelte-french-toast";
  import { createGame, type GetAllUsersResponse } from "./api";
  import Counter from "./Counter.svelte";
  import GoalInput from "./GoalInput.svelte";
  import User from "./User.svelte";

  let {
    users,
    toastCallback,
    getData,
  }: {
    users: GetAllUsersResponse;
    toastCallback: (
      arg0: () => Promise<unknown>,
      arg1: {
        loading: string;
        success: string;
        error: string;
      },
    ) => void;
    getData: () => Promise<void>;
  } = $props();

  let useRandomPlayers: boolean = $state(false);

  let api_key: string = $state("");

  const positions = ["Goalie", "Defender", "Middle", "Striker"];
  let used_data: {
    red: { users: typeof users; positions: string[] };
    blue: { users: typeof users; positions: string[] };
  } = $state({
    red: { users: [], positions: [] },
    blue: { users: [], positions: [] },
  });

  let user_goals: number = $state(0);
  let selected_user: (typeof users)[number] | undefined = $state();
  let user_team: "red" | "blue" | undefined = $state();
  let user_positions: Array<string> = $state([]);

  let red_score = $state(0);
  let blue_score = $state(0);

  const chosen_users: {
    name: string;
    id: number;
    goals: number;
    team: "red" | "blue";
    positions: string[];
  }[] = $state([]);

  const addUser = () => {
    console.log(selected_user, user_goals, user_team, user_positions);
    if (selected_user === undefined) return;
    if (user_goals === undefined) return;
    if (user_team === undefined) return;

    chosen_users.push({
      name: selected_user.name,
      id: selected_user.id,
      goals: user_goals,
      team: user_team,
      positions: user_positions,
    });

    used_data[user_team].positions = [
      ...used_data[user_team].positions,
      ...user_positions,
    ];
    used_data[user_team].users = [...used_data[user_team].users, selected_user];

    user_goals = 0;
    selected_user = { id: 0, name: "" };
    user_team = undefined;
    user_positions = [];
  };

  const userFilter = (user: (typeof users)[number]) => {
    return (
      !used_data.blue.users.some((u) => user.id === u.id) &&
      !used_data.red.users.some((u) => user.id === u.id)
    );
  };

  const getTeam = (team: "blue" | "red") =>
    chosen_users
      .filter((user) => user.team === team)
      .map((user) => ({
        playerId: user.id,
        playerPositions: user.positions.map(
          (pos) => Number(positions.indexOf(pos)) as 0 | 1 | 2 | 3,
        ),
      }));

  const submitGame = async () => {
    const body = {
      redTeamPlayers: getTeam("red"),
      redTeamScore: red_score,
      blueTeamPlayers: getTeam("blue"),
      blueTeamScore: blue_score,
    };

    let res = await createGame(body, api_key);
    if (res) {
      toastCallback(getData, {
        loading: "Loading data...",
        success: "Data loaded!",
        error: "Failed to load data",
      });
      chosen_users.length = 0;
      red_score = 0;
      blue_score = 0;
      used_data.red = { users: [], positions: [] };
      used_data.blue = { users: [], positions: [] };
      user_team = undefined;
      user_positions = [];
    }
  };

  let randomUsers: typeof users = $state([]);
  const toggleRandom = (user: (typeof users)[number]) => {
    if (randomUsers.includes(user)) {
      randomUsers = randomUsers.filter((u) => u !== user);
    } else {
      randomUsers = [...randomUsers, user];
    }
  };

  // for each user of in randomUsers, choose a random position or positions and a team
  // the teams should be balanced
  const chooseRandom = () => {
    if (randomUsers.length === 0) return;
    if (chosen_users.length > 0) {
      toast("🎲 Shuffling teams 🎲");
      chosen_users.length = 0;
    }

    const teamSize = Math.floor(randomUsers.length / 2);
    randomUsers = randomUsers.sort(() => Math.random() - 0.5);

    const redUsers = randomUsers.slice(0, teamSize);
    assignRandom(redUsers, "red");
    const blueUsers = randomUsers.slice(teamSize);
    assignRandom(blueUsers, "blue");
  };

  const assignRandom = (
    players: GetAllUsersResponse,
    selectedTeam: "red" | "blue",
  ) => {
    const size = players.length;

    switch (size) {
      case 1:
        selected_user = players[0];
        user_team = selectedTeam;
        user_positions = [...positions];
        addUser();
        break;

      case 2:
        players.forEach((player, i) => {
          selected_user = player;
          user_team = selectedTeam;
          user_positions = [...positions.slice(i * 2, (i + 1) * 2)];
          addUser();
        });
        break;

      case 3:
        const doublePos = Math.floor(Math.random() * 3);
        selected_user = players[0];
        user_team = selectedTeam;
        user_positions = [positions[doublePos], positions[doublePos + 1]];

        let remainingPositions = positions.filter(
          (pos) => !user_positions.includes(pos),
        );
        addUser();

        players.slice(1).forEach((player, i) => {
          selected_user = player;
          user_team = selectedTeam;
          user_positions = [remainingPositions[i]];
          addUser();
        });
        break;

      case 4:
        players.forEach((player, i) => {
          selected_user = player;
          user_team = selectedTeam;
          user_positions = [positions[i]];
          addUser();
        });
        break;
    }
  };
</script>

<div class="users">
  <div class="random-checker">
    <label for="select-user">Select users</label>
    <div>
      Assign randomly
      <input
        type="checkbox"
        name="random"
        id="random"
        bind:checked={useRandomPlayers}
      />
    </div>
  </div>
  {#if useRandomPlayers}
    <div class="random-user-container">
      {#each users as user}
        <button
          onclick={() => {
            toggleRandom(user);
          }}
          class:checked={randomUsers.includes(user)}
        >
          {user.name}
        </button>
      {/each}
    </div>
  {:else}
    <select id="select-user" bind:value={selected_user}>
      {#await users}
        <option>Loading...</option>
      {:then users}
        {#each users.filter(userFilter) as user}
          <option value={user}>{user.name}</option>
        {/each}
      {/await}
    </select>
  {/if}

  <div class="teams">
    <Counter bind:count={user_goals} />
    <div class="positions red">
      {#each positions as position, index}
        <div>
          <label for="red-{position}">{position}</label>
          <input
            type="checkbox"
            name="red-{position}"
            id="red-{position}"
            value={index}
            oninput={(e) => {
              if (user_team === undefined) user_team = "red";
              const target = e?.target as HTMLInputElement;

              if (user_positions.includes(position)) {
                user_positions = user_positions.filter(
                  (pos) => pos !== position,
                );
              }

              if (target.checked) {
                user_positions.push(position);
              }
            }}
            checked={used_data.red.positions.includes(position)}
            disabled={user_team === "blue" ||
              used_data.red.positions.includes(position)}
          />
        </div>
      {/each}
    </div>

    <div class="positions blue">
      {#each positions as position, index}
        <div>
          <label for="red-{position}">{position}</label>
          <input
            type="checkbox"
            name="red-{position}"
            id="red-{position}"
            value={index}
            oninput={(e) => {
              if (user_team === undefined) user_team = "blue";
              const target = e?.target as HTMLInputElement;

              if (user_positions.includes(position)) {
                user_positions = user_positions.filter(
                  (pos) => pos !== position,
                );
              }

              if (target.checked) {
                user_positions.push(position);
              }
            }}
            checked={used_data.blue.positions.includes(position)}
            disabled={user_team === "red" ||
              used_data.blue.positions.includes(position)}
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="input-row">
    {#if useRandomPlayers}
      <button onclick={() => chooseRandom()}>Choose</button>
    {:else}
      <button onclick={() => addUser()}>Add player</button>
    {/if}
  </div>

  <div class="chosen-players red">
    <div class="score">
      <h2>Red team</h2>
      <h2>Score: {red_score}</h2>
    </div>
    <ul class="player-rows">
      {#each chosen_users.filter((user) => user.team === "red") as user}
        <li class="player-row">
          <h3>{user.name}</h3>
          <div>
            {#each user.positions as pos}
              <span>{pos}</span>
            {/each}
          </div>
          <span>Goals: {user.goals}</span>
        </li>
      {/each}
    </ul>
  </div>
  <GoalInput bind:score={red_score} --color="var(--red-1)" />

  <div class="chosen-players blue">
    <div class="score">
      <h2>Blue team</h2>
      <h2>Score: {blue_score}</h2>
    </div>
    <ul class="player-rows">
      {#each chosen_users.filter((user) => user.team === "blue") as user}
        <li class="player-row">
          <h3>{user.name}</h3>
          <div>
            {#each user.positions as pos}
              <span>{pos}</span>
            {/each}
          </div>
          <span>Goals: {user.goals}</span>
        </li>
      {/each}
    </ul>
  </div>
  <GoalInput bind:score={blue_score} --color="var(--blue-1)" />

  <div class="submit-container">
    <input type="password" bind:value={api_key} placeholder="API key" />
    <button
      onclick={() => {
        toastCallback(submitGame, {
          loading: "Submitting game",
          success: "Game submitted",
          error: "Could not submit game",
        });
      }}>Submit game</button
    >
  </div>
</div>

<style>
  .users {
    padding: 1rem;
    margin: 0.5rem;
    margin-top: 1rem;
    background: var(--green-2);
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    gap: 1rem;
    overflow-y: scroll;
    width: fit-content;
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1rem;
    background: var(--green-3);
    border: none;
    border-radius: 0.25rem;
  }

  .random-checker {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .random-user-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;

    button {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      border: 1px solid var(--green-3);
    }

    .checked {
      border: 1px solid white;
    }
  }

  .input-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
  }

  .chosen-players {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .teams {
    display: flex;
    width: 100%;
    gap: 1rem;
  }

  .positions {
    border-radius: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;

    & > div {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      align-items: center;
      gap: 1rem;
    }

    & input {
      width: 1.25rem;
      height: 1.25rem;
      background: var(--green-3);
      border: none;
    }
  }

  .score {
    display: flex;
    justify-content: space-between;
  }

  .player-rows {
    padding-inline-start: 0;
    padding: 0;
    margin: 0;
  }

  .red .player-row {
    background: var(--red-1);
  }

  .blue .player-row {
    background: var(--blue-1);
  }

  .player-row {
    list-style: none;
    padding: 0.5rem 0;
    border-radius: 0.25rem;

    display: grid;
    grid-template-columns: 1fr auto;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      grid-row: span 2;
      grid-column: 2;
      place-content: center;
      align-items: end;
    }
  }

  .submit-container {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .blue {
    background: var(--blue-1);
  }

  .red {
    background: var(--red-1);
  }
</style>
