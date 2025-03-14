/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/games/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all games (TODO: limit/skip/pagination when inevitably this starts failing because of CPU time) */
        get: operations["getGamesAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/games/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get game info by ID */
        get: operations["getGamesById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/games/new": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Create a new game. NOTE: Playerpositions. Goalie=0, Defender=1, Middle=2, Striker=3 */
        post: operations["postGamesNew"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/all/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get statistics for all players */
        get: operations["getPlayersAllStats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all players */
        get: operations["getPlayersAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get player name by id */
        get: operations["getPlayersById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/new": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Create a new player */
        post: operations["postPlayersNew"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/{id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get statistics for a single player */
        get: operations["getPlayersByIdStats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getGamesAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: {
                        date: string;
                        teamRedScore: number;
                        teamBlueScore: number;
                        players: {
                            name: string;
                            team: string;
                        }[];
                    }[];
                };
            };
        };
    };
    getGamesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: {
                        date: string;
                        teamRedScore: number;
                        teamBlueScore: number;
                        players: {
                            name: string;
                            team: string;
                        }[];
                    };
                };
            };
        };
    };
    postGamesNew: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    redTeamScore: number;
                    blueTeamScore: number;
                    redTeamPlayers: {
                        playerId: number;
                        playerPositions: (0 | 1 | 2 | 3)[];
                    }[];
                    blueTeamPlayers: {
                        playerId: number;
                        playerPositions: (0 | 1 | 2 | 3)[];
                    }[];
                };
            };
        };
        responses: {
            /** @description New game Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: {
                        id: number;
                    };
                };
            };
        };
    };
    getPlayersAllStats: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description App players statistics */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: unknown[];
                };
            };
        };
    };
    getPlayersAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: unknown[];
                };
            };
        };
    };
    getPlayersById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    postPlayersNew: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    name: string;
                };
            };
        };
        responses: {
            /** @description New player created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: Record<string, never>;
                };
            };
        };
    };
    getPlayersByIdStats: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get statistics for a single player */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    json: Record<string, never>;
                };
            };
        };
    };
}
