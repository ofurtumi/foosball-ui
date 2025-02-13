import type { Game, User } from "./types";
import type { paths } from "../types/schema.d.ts";

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
): Promise<boolean> => {
  const success = await fetch(`${base_url}/games/new`, {
    method: "POST",
    headers: {
      accept: "json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
    },
    body: JSON.stringify({
      redTeamPlayers: red_players,
      redTeamScore: red_score,
      blueTeamPlayers: blue_players,
      blueTeamScore: blue_score,
    }),
  });

  if (!success.ok) {
    throw new Error("Failed to create game");
  }

  return success.ok;
};
