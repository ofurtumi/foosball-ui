import type { paths, operations } from "../schema";


const baseUrl = "https://foosball.steini-b11.workers.dev";

export type GetUserByIdResponse = operations["getPlayersById"]["responses"]["200"]["content"]['text/plain']
export const getUserById = async (id: number): Promise<GetUserByIdResponse> => {
  const data = await fetch(`${baseUrl}/players/${id}`);
  return data.json()
}

export type GetAllUsersResponse = { id: number, name: string }[] // operations['/players/all']['get']['responses']['200']['content']['json']
export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const data = await fetch(`${baseUrl}/players/all`);
  return data.json();
};

export type GetAllGamesResponse = operations['getGamesAll']['responses']['200']['content']['json']
export const getAllGames = async (): Promise<GetAllGamesResponse> => {
  const data = await fetch(`${baseUrl}/games/all`);
  return data.json()
};

export type GetGameByIdResponse = operations['getGamesById']['responses']['200']['content']['json']
export const getGameById = async (id: number): Promise<GetGameByIdResponse> => {
  const data = await fetch(`${baseUrl}/games/${id}`);
  return data.json()
}

export type PostCreateGameBody = NonNullable<operations['postGamesNew']['requestBody']>['content']['application/json']
export const createGame = async (body: PostCreateGameBody, apiKey: string): Promise<boolean> => {
  const data = await fetch(`${baseUrl}/games/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ apiKey }`
    },
    body: JSON.stringify(body)
  });

  return data.ok;
}

export type GetPlayerByIdStatsResponse = {
  name: string,
  id: number,
  wins: number,
  losses: number,
  totalGames: number,
  howOftenBlue: number,
  howOftenRed: number,
  winsAsBlue: number,
  winsAsRed: number
} // operations['getPlayersByIdStats']['responses']['200']['content']['json']
export const getPlayerByIdStats = async (id: number): Promise<GetPlayerByIdStatsResponse> => {
  const data = await fetch(`${baseUrl}/players/${id}/stats`);
  return data.json()
}

export type GetAllStatsResponse =
// operations['getPlayersAllStats']['responses']['200']['content']['json'] as
{
    totalGames: number,
    gamesWon: number,
    playerId: number,
    positionHistograms: 
      {
        frequency: number,
        position: (0|1|2|3)[]
      }[]
    
  }[]

export type ExtendedStatResponse = (GetAllStatsResponse[number] & {
  name: string;
  winPercentage: number;
})[]

export const getAllStats = async (): Promise<GetAllStatsResponse> => {
  const data = await fetch(`${baseUrl}/players/all/stats`);
  return data.json()
}