import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

import template from '/imports/components/games/game-in-progress.html';

class GameInProgressCtrl {
  constructor($scope, $filter, $ionicPopup, gameScoreService) {
    $scope.viewModel(this);
    this.$filter = $filter;
    this.$ionicPopup = $ionicPopup;
    this.gameScoreService = gameScoreService;

    this.enabled = true;
    this.showControls = this.controls;

    this.helpers({
      players: () => {
        return Players.find({}, { sort: { name: 1 } });
      }
    });
  }

  winStats() {
    if (this.game) {
      const redWins = this.gameScoreService.getTeamEloOnWin(this.game.teamRed._id, this.game.teamBlue._id);
      const blueWins = this.gameScoreService.getTeamEloOnWin(this.game.teamBlue._id, this.game.teamRed._id);
      return {
        redWinElo: redWins.win,
        blueWinElo: blueWins.win,
        redWinChance: redWins.percent,
        blueWinChance: blueWins.percent
      }
    }
  }

  duration() {
    if (this.game)
      return this.$filter('duration')(this.game.startDate, Date.now());
  }

  redDefenderScored() {
    this.game.teamRed.defender.goals++;
    Games.update(this.game._id, {
      $inc: { teamRedScore: 1 },
      $set: { teamRed: this.game.teamRed }
    });
    
    this.gameScoreService.scored(this.game, 'Red', 'defender');
  }

  redAttackerScored() {
    this.gameScoreService.scored(this.game, 'Red', 'attacker');
  }

  blueDefenderScored() {
    this.gameScoreService.scored(this.game, 'Blue', 'defender');
  }

  blueAttackerScored() {
    this.gameScoreService.scored(this.game, 'Blue', 'attacker');
  }

  scored(player) {
    // this.gameScoreService.scored(teamId, player, this.game);
    //find the key that belongs to the player and you know who he is ...
    Object.prototype.getKey = function(value) {
      var object = this;
      for(var key in object){
         if(object[key]==value) return key;
      }
    };
    let found = Object.keys(this.game).or(o=>o[key] === player);
    console.log(found);
  }

  trashGameInProgressModal() {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Trash this game?',
      template: 'This will end this game. The scored goals will not result in any change in ELO standings.<br><b>Do you want to end this game?</b>'
    });

    confirmPopup.then((res) => {
      if (res) {
        Games.remove(this.game._id);
      } else {
        return;
      }
    });
  }
}

export default angular.module('gameinprogress', [
  angularMeteor
])
  .component('gameInProgress', {
    templateUrl: 'imports/components/games/game-in-progress.html',
    controller: ['$scope', '$filter', '$ionicPopup', 'gameScoreService', GameInProgressCtrl],
    bindings: {
      game: '<',
      controls: '<'
    }
  });
