import angularMeteor from 'angular-meteor';

import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class TeamsService {
  constructor() {
  }
  
  eloInc(teamId, elo) {
    Teams.update({ _id: teamId },
      {
        $inc: { elo: elo }
      }
    );
  }
  
  getCombinedElo(team) {
    if (!team._id) {
      team = Teams.findOne(team);
    }
    let player1 = Players.findOne({ _id: team.players[0] });
    let player2 = Players.findOne({ _id: team.players[1] });
    return (player1.elo + player2.elo) / 2;
  }
}

export default angular.module('teamsservice', [
  angularMeteor
])
  .service('teamsService', TeamsService);
  