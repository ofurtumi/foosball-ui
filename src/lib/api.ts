import type { Game, User } from "./types";

const base_url = "https://foosball.steini-b11.workers.dev";

export const getAllUsers = async (): Promise<User[]> => {
  const data = await fetch(`${base_url}/players/all`).then(
    async (res) => await res.json(),
  );
  return data as User[];
};

export const getAllGames = async (): Promise<Game[]> => {
  const data = await fetch(`${base_url}/games/all`).then(
    async (res) => await res.json(),
  );
  return data as Game[];
};

export const createGame = async (
  red_players: number[],
  red_score: number,
  blue_players: number[],
  blue_score: number,
  api_key: string,
): Promise<void> => {
  await fetch(`${base_url}/games/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${api_key}`,
    },
    body: JSON.stringify({
      redTeamPlayers: red_players,
      redTeamScore: red_score,
      blueTeamPlayers: blue_players,
      blueTeamScore: blue_score,
    }),
  });
};

