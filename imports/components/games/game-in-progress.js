import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

import template from '/imports/components/games/game-in-progress.html';

class GameInProgressCtrl {
  constructor($scope, $state, $filter, $interval, $ionicPopup, $ionicHistory, gameScoreService) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$filter = $filter;
    this.$interval = $interval;
    this.$ionicPopup = $ionicPopup;
    this.$ionicHistory = $ionicHistory;
    this.gameScoreService = gameScoreService;

    this.enabled = true;
    this.showControls = this.controls;

    this.helpers({
      players: () => {
        return Players.find({}, { sort: { name: 1 } });
      }
    });
  }

  redWinElo() {
    if (this.game)
      return this.gameScoreService.getTeamEloOnWin(this.game.teamRed._id, this.game.teamBlue._id).win;
  }

  blueWinElo() {
    if (this.game)
      return this.gameScoreService.getTeamEloOnWin(this.game.teamBlue._id, this.game.teamRed._id).win;
  }

 redWinChance() {
    if (this.game)
      return this.gameScoreService.getTeamEloOnWin(this.game.teamRed._id, this.game.teamBlue._id).percent;
  }

  blueWinChance() {
    if (this.game)
      return this.gameScoreService.getTeamEloOnWin(this.game.teamBlue._id, this.game.teamRed._id).percent;
  }

  duration() {
    if (this.game)
      return this.$filter('duration')(this.game.startDate, Date.now());
  }

  scored(teamId, player) {
    this.gameScoreService.scored(teamId, player, this.game);
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
    controller: ['$scope', '$state', '$filter', '$interval', '$ionicPopup', '$ionicHistory', 'gameScoreService', GameInProgressCtrl],
    bindings: {
      game: '<',
      controls: '<'
    }
  });
