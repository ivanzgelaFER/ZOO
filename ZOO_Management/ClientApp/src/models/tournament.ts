import { ICompetitor } from "./competitions";

export interface ITournament {
    rounds: IPair[][];
}

export interface IPair {
    player1?: ICompetitor;
    player2?: ICompetitor;
}