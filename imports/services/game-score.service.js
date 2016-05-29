import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class GameScoreService {
  constructor(playersService, teamsService) {
    this.playersService = playersService;
    this.teamsService = teamsService;
    // Maximum movement of ELO in 1 match
    this.maxEloMovement = 75;
  }

  scored(game, color, position) {
    console.log('game, color, position', game, color, position);
  }
  
  scoredPPP(teamId, player, inprogress) {
    console.log('teamId, player, inprogress', teamId, player, inprogress);
    if (inprogress.teamRed._id == teamId)               // red scored
    {
      if (inprogress.teamRed.attacker._id == player) {  //red attacker scored
        inprogress.teamRed.attacker.goals++;
        Games.update(inprogress._id, {
          $inc: { teamRedScore: 1 },
          $set: { teamRed: inprogress.teamRed }
        });
      } else {                                          // red defender scored
        inprogress.teamRed.defender.goals++;
        Games.update(inprogress._id, {
          $inc: { teamRedScore: 1 },
          $set: { teamRed: inprogress.teamRed }
        });
      }
      if (inprogress.teamRedScore++ > 5) {              // red won
        var eloChange = this.updateELO(inprogress.teamRed._id, inprogress.teamBlue._id);
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamRed._id,
            endDate: new Date(),
            eloChange: eloChange
          }
        });

        console.log('red won!');
      }
    } else {                                            // blue scored
      if (inprogress.teamBlue.attacker._id == player) { // blue attacker scored
        inprogress.teamBlue.attacker.goals++;
        Games.update(inprogress._id, {
          $inc: { teamBlueScore: 1 },
          $set: { teamBlue: inprogress.teamBlue }
        });
      } else {                                          // blue defender scored
        inprogress.teamBlue.defender.goals++;
        Games.update(inprogress._id, {
          $inc: { teamBlueScore: 1 },
          $set: { teamBlue: inprogress.teamBlue }
        });
      }
      if (inprogress.teamBlueScore++ > 5) {             // blue won

        var eloChange = this.updateELO(inprogress.teamBlue._id, inprogress.teamRed._id);
        Games.update(inprogress._id, {
          $set: {
            winner: inprogress.teamBlue,
            endDate: new Date(),
            eloChange: eloChange
          }
        });
        console.log('blue won!');
      }
    }
  }

  updateELO(winTeamId, loseTeamId) {

    let winTeam = Teams.findOne({ _id: winTeamId });
    let loseTeam = Teams.findOne({ _id: loseTeamId });

    let eloChange = this.getTeamEloOnWin(winTeam, loseTeam).win;

    this.playersService.eloInc(winTeam.players[0], eloChange);
    this.playersService.eloInc(winTeam.players[1], eloChange);
    this.playersService.eloInc(loseTeam.players[0], -eloChange);
    this.playersService.eloInc(loseTeam.players[1], -eloChange);

    let teamEloChanged = this.calculateELORatingChange(winTeam.teamElo, loseTeam.teamElo, this.maxEloMovement);
    console.log('Team ELO change by: ', teamEloChanged);
    
    this.teamsService.eloInc(winTeamId, teamEloChanged.win);
    this.teamsService.eloInc(loseTeamId, teamEloChanged.loss);

    return eloChange;
  }

  getTeamEloOnWin(winTeam, loseTeam) {
    let eloChanged = this.calculateELORatingChange(
      this.teamsService.getCombinedElo(winTeam),
      this.teamsService.getCombinedElo(loseTeam),
      this.maxEloMovement);
    return eloChanged;
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
}

export default angular.module('gameservice', [
  angularMeteor
])
  .service('gameScoreService', ['playersService', 'teamsService', GameScoreService]);
