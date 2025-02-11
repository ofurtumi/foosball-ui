export interface User { name: string, id: number }

export interface Game {
    date: string
    teamRedScore: number,
    teamBlueScore: number,
    players: {
        name: string,
        team: "RED" | "BLUE"
    }[]
}