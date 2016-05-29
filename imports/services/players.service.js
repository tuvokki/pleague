import angularMeteor from 'angular-meteor';

import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class PlayersService {
  constructor() {
  }
  
  eloInc(playerId, elo) {
    Players.update({ _id: playerId },
      {
        $inc: { elo: elo }
      }
    );
  }
}

export default angular.module('playersservice', [
  angularMeteor
])
  .service('playersService', PlayersService);
  