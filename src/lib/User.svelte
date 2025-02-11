<script lang="ts">
  let {
    users,
    positions,
    team,
  }: {
    users: Array<{ name: string; id: string }>;
    positions: Array<String>;
    team: "red" | "blue";
  } = $props();

  const all_positions = ["Goalie", "Defender", "Middle", "Striker"];

  let selected_user: string | undefined = $state();
  let selected_positions: string[] = $state([]);
  let user_goals: number | undefined = $state();
</script>

<div class="prison {team}">
  <select id="select-user" bind:value={selected_user}>
    {#each users as user}
      <option value={user.id}>{user.name}</option>
    {/each}
  </select>

  <div class="cell">
    {#each all_positions as position}
      <input
        type="checkbox"
        value={position}
        id={position}
        disabled={!positions.includes(position)}
      />
      <label for={position}>{position}</label>
    {/each}
  </div>
</div>

<style>
  .prison {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cell {
    display: flex;
    justify-content: center;
  }

  select {
    padding: 0.5rem;
    font-size: 1rem;
    background: var(--green-3);
    border: none;
    border-radius: 0.25rem;
  }

  .red {
    background: var(--red-1);
  }

  .blue {
    background: var(--blue-1);
  }
</style>
