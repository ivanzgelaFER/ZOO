import { ICompetitor } from "../models/competitions";
import { ITournament, IPair } from "../models/tournament";

export const createTournament = (competitors: ICompetitor[]) => {
    let competitorsFilter:ICompetitor[] = [];
    competitors.forEach((competitor) => {if(competitor.name !== "") competitorsFilter.push(competitor)})
    let tournament: ITournament = {rounds: []}

    if(competitorsFilter.length === 4) {
        //kolo 1
        const pair11: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[1]}
        const pair12: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[3]}
        tournament.rounds.push([pair11, pair12]);
        //kolo 2
        const pair21: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[2]}
        const pair22: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[3]}
        tournament.rounds.push([pair21, pair22]);
        //kolo 3
        const pair31: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[3]}
        const pair32: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[2]}
        tournament.rounds.push([pair31, pair32]);
    } else if(competitorsFilter.length === 5) {
        //kolo 1
        const pair11: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[1]}
        const pair12: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[3]}
        tournament.rounds.push([pair11, pair12]);
        //kolo 2
        const pair21: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[2]}
        const pair22: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[4]}
        tournament.rounds.push([pair21, pair22]);
        //kolo 3
        const pair31: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[3]}
        const pair32: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[4]}
        tournament.rounds.push([pair31, pair32]);
        //kolo 4
        const pair41: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[4]}
        const pair42: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[3]}
        tournament.rounds.push([pair41, pair42]);
        //kolo 5
        const pair51: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[2]}
        const pair52: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[4]}
        tournament.rounds.push([pair51, pair52]);
 
    } else if(competitorsFilter.length === 6) {
        //kolo 1
        const pair11: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[1]}
        const pair12: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[3]}
        const pair13: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[5]}
        tournament.rounds.push([pair11, pair12, pair13]);
        //kolo 2
        const pair21: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[2]}
        const pair22: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[4]}
        const pair23: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[5]}
        tournament.rounds.push([pair21, pair22, pair23]);
        //kolo 3
        const pair31: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[3]}
        const pair32: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[5]}
        const pair33: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[4]}
        tournament.rounds.push([pair31, pair32, pair33]);
        //kolo 4
        const pair41: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[4]}
        const pair42: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[3]}
        const pair43: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[5]}
        tournament.rounds.push([pair41, pair42, pair43]);
    } else if(competitorsFilter.length === 7) {
        //kolo 1
        const pair11: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[1]}
        const pair12: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[3]}
        const pair13: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[5]}
        tournament.rounds.push([pair11, pair12, pair13]);
        //kolo 2
        const pair21: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[2]}
        const pair22: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[6]}
        const pair23: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[4]}
        tournament.rounds.push([pair21, pair22, pair23]);
        //kolo 3
        const pair31: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[3]}
        const pair32: IPair = {player1: competitorsFilter[5], player2: competitorsFilter[6]}
        const pair33: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[4]}
        tournament.rounds.push([pair31, pair32, pair33]);
        //kolo 4
        const pair41: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[4]}
        const pair42: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[5]}
        const pair43: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[6]}
        tournament.rounds.push([pair41, pair42, pair43]);
        //kolo 5
        const pair51: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[5]}
        const pair52: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[3]}
        const pair53: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[6]}
        tournament.rounds.push([pair51, pair52, pair53]);
        //kolo 6
        const pair61: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[6]}
        const pair62: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[4]}
        const pair63: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[5]}
        tournament.rounds.push([pair61, pair62, pair63]);
        //kolo 7
        const pair71: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[2]}
        const pair72: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[5]}
        const pair73: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[6]}
        tournament.rounds.push([pair71, pair72, pair73]);
    } else if(competitorsFilter.length === 8) {
         //kolo 1
         const pair11: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[1]}
         const pair12: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[3]}
         const pair13: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[5]}
         const pair14: IPair = {player1: competitorsFilter[6], player2: competitorsFilter[7]}
         tournament.rounds.push([pair11, pair12, pair13, pair14]);
         //kolo 2
         const pair21: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[2]}
         const pair22: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[3]}
         const pair23: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[6]}
         const pair24: IPair = {player1: competitorsFilter[5], player2: competitorsFilter[7]}
         tournament.rounds.push([pair21, pair22, pair23, pair24]);
         //kolo 3
         const pair31: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[3]}
         const pair32: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[2]}
         const pair33: IPair = {player1: competitorsFilter[4], player2: competitorsFilter[7]}
         const pair34: IPair = {player1: competitorsFilter[5], player2: competitorsFilter[6]}
         tournament.rounds.push([pair31, pair32, pair33, pair34]);
         //kolo 4
         const pair41: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[4]}
         const pair42: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[5]}
         const pair43: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[7]}
         const pair44: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[6]}
         tournament.rounds.push([pair41, pair42, pair43, pair44]);
         //kolo 5
         const pair51: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[5]}
         const pair52: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[6]}
         const pair53: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[4]}
         const pair54: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[7]}
         tournament.rounds.push([pair51, pair52, pair53, pair54]);
         //kolo 6
         const pair61: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[6]}
         const pair62: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[7]}
         const pair63: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[5]}
         const pair64: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[4]}
         tournament.rounds.push([pair61, pair62, pair63, pair64]);
         //kolo 7
         const pair71: IPair = {player1: competitorsFilter[0], player2: competitorsFilter[7]}
         const pair72: IPair = {player1: competitorsFilter[1], player2: competitorsFilter[4]}
         const pair73: IPair = {player1: competitorsFilter[2], player2: competitorsFilter[6]}
         const pair74: IPair = {player1: competitorsFilter[3], player2: competitorsFilter[5]}
         tournament.rounds.push([pair71, pair72, pair73, pair74]);
    }
    return tournament;
}

 