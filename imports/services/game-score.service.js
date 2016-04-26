import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class GameScoreService {
  constructor() {
  }

  scored(team, inprogress) {
    let red = Teams.findOne({ _id: inprogress.teamRed });
    let blue = Teams.findOne({ _id: inprogress.teamBlue });
    
    if (team === 'red') {
      Games.update(inprogress._id, {
        $set: { teamRedScore: inprogress.teamRedScore + 1 }
      });
      console.log('red scored!');
      if (inprogress.teamRedScore++ > 5) {
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamRed,
            endDate: Date.now()
          }
        });

	this.updateELO(red,blue);
        console.log('red won!');
      }
    } else {
      Games.update(inprogress._id, {
        $set: { teamBlueScore: inprogress.teamBlueScore + 1 }
      });
      console.log('blue scored!');
      if (inprogress.teamBlueScore++ > 5) {
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamBlue,
            endDate: Date.now()
          }
        });
	
	this.updateELO(blue,red);
        console.log('blue won!');
      }
    }
  }

  updateELO(winTeam,looseTeam) {
        let winp1 = Players.findOne({ _id: winTeam.players[0] });
        let winp2 = Players.findOne({ _id: winTeam.players[1] });
        let loosep1 = Players.findOne({ _id: looseTeam.players[0] });
        let loosep2 = Players.findOne({ _id: looseTeam.players[1] });

        let winelo = (winp1.elo + winp2.elo) / 2;
        let looseelo = (loosep1.elo + loosep2.elo) / 2;

        let elochanged = this.calculateELORatingChange(winelo, looseelo, 150);
        console.log(elochanged);
	
	Players.update({ _id: winp1._id },
          {
            $inc: { elo: elochanged.win }
          }
        )
        Players.update({ _id: winp2._id },
          {
            $inc: { elo: elochanged.win }
          }
        )
        Players.update({ _id: loosep1._id },
          {
            $inc: { elo: elochanged.loss }
          }
        )
        Players.update({ _id: loosep2._id },
          {
            $inc: { elo: elochanged.loss }
          }
        )
  }

  /**
   * This method will calculate the change in a player's
   * Elo rating after playing a single game against another player.
   * The value K is the maximum change in rating. 
   **/
  calculateELORatingChange(elo1, elo2, k) {
    var percentage = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400));

    return {
      win: Math.round(k * (1 - percentage)),
      draw: Math.round(k * (.5 - percentage)),
      loss: Math.round(k * (0 - percentage)),
      percent: Math.round(percentage * 100)
    };
  }
  
  static factory(){
    return new GameScoreService();
  }
}

export default angular.module('services', [
  angularMeteor
])
  .factory('gameScoreService', GameScoreService.factory);
