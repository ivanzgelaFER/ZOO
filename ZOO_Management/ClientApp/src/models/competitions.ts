import { ITournament } from "./tournament";

export interface ICompetitor {
    name?: string;
}

export interface ICompetition {
    id?: number;
    name?: string;
    vrsta?: string;
    competitors?: ICompetitor[];
    win?: number;
    draw?: number;
    lose?: number;
    tournament?: ITournament
}

export const competitionInit: ICompetition = {
    name: "",
    vrsta: "",
    competitors: [{name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}, {name: ""}],
    win: 0,
    draw: 0,
    lose: 0
};

export interface ICompData {
    competition?: ICompetition,
    games?: IGame[]
}

export interface IGame {
    id: number,
    round: string,
    player1: string,
    player2: string,
    result: number
}

 

export interface IRankingData {
    player: string,
    points: number
}

