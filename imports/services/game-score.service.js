import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class GameScoreService {
  constructor() {
  }

  scored(teamId, player, inprogress) {
    if (inprogress.teamRed._id == teamId) // red scored
    {
      if (inprogress.teamRed.attacker._id == player) {
        inprogress.teamRed.attacker.goals++;
        Games.update(inprogress._id, {
          $inc: { teamRedScore: 1 },
          $set: { teamRed: inprogress.teamRed }
        });
      } else {
        inprogress.teamRed.defender.goals++;
        Games.update(inprogress._id, {
          $inc: { teamRedScore: 1 },
          $set: { teamRed: inprogress.teamRed }
        });
      }

      console.log('red scored! by player: ', player);
      if (inprogress.teamRedScore++ > 5) {
        var eloChange = this.updateELO(inprogress.teamRed._id, inprogress.teamBlue._id);
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamRed._id,
            endDate: Date.now(),
            eloChange: eloChange
          }
        });

        console.log('red won!');
      }
    } else {
      if (inprogress.teamBlue.attacker._id == player) {
        inprogress.teamBlue.attacker.goals++;
        Games.update(inprogress._id, {
          $inc: { teamBlueScore: 1 },
          $set: { teamBlue: inprogress.teamBlue }
        });
      } else {
        inprogress.teamBlue.attacker.goals++;
        Games.update(inprogress._id, {
          $inc: { teamBlueScore: 1 },
          $set: { teamBlue: inprogress.teamBlue }
        });
      }
      console.log('blue scored! by player: ', player);
      if (inprogress.teamBlueScore++ > 5) {
        
        var eloChange = this.updateELO(inprogress.teamBlue._id, inprogress.teamRed._id);
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamBlue,
            endDate: Date.now(),
            eloChange: eloChange
          }
        });
        console.log('blue won!');
      }
    }
  }

  updateELO(winTeamId, looseTeamId) {

    let eloChange = this.getTeamEloOnWin(winTeamId, looseTeamId);
    console.log(eloChange);
    let winTeam = Teams.findOne({ _id: winTeamId });
    let looseTeam = Teams.findOne({ _id: looseTeamId });
    let winp1 = Players.findOne({ _id: winTeam.players[0] });
    let winp2 = Players.findOne({ _id: winTeam.players[1] });
    let loosep1 = Players.findOne({ _id: looseTeam.players[0] });
    let loosep2 = Players.findOne({ _id: looseTeam.players[1] });

    Players.update({ _id: winp1._id },
      {
        $inc: { elo: eloChange }
      }
    )
    Players.update({ _id: winp2._id },
      {
        $inc: { elo: eloChange }
      }
    )
    Players.update({ _id: loosep1._id },
      {
        $inc: { elo: -eloChange }
      }
    )
    Players.update({ _id: loosep2._id },
      {
        $inc: { elo: -eloChange }
      }
    )
    return eloChange;
  }

  getTeamEloOnWin(winTeamId, looseTeamId) {
    let winTeam = Teams.findOne({ _id: winTeamId });
    let looseTeam = Teams.findOne({ _id: looseTeamId });
    let winp1 = Players.findOne({ _id: winTeam.players[0] });
    let winp2 = Players.findOne({ _id: winTeam.players[1] });
    let loosep1 = Players.findOne({ _id: looseTeam.players[0] });
    let loosep2 = Players.findOne({ _id: looseTeam.players[1] });

    let winelo = (winp1.elo + winp2.elo) / 2;
    let looseelo = (loosep1.elo + loosep2.elo) / 2;
    // Maximum movement of ELO in 1 match
    let maxEloMovement = 75;

    let eloChanged = this.calculateELORatingChange(winelo, looseelo, maxEloMovement);
    return eloChanged.win;
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
