import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

import template from '/imports/components/games/game-in-progress.html';

class GameInProgressCtrl {
  constructor($scope, $state, $filter, $timeout, $ionicPopup, $ionicHistory, gameScoreService) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$filter = $filter;
    this.$timeout = $timeout;
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

  /**
   * Start preparing to revert a goal made by this player
   *
   * @param {number} teamId the team id
   * @param {number} playerId the player id
   *
   * @return {void}
   */
  prepareRevertGoal(teamId, playerId) {
    this.prepareTimer = this.$timeout(() => {
      this.reverting = playerId;
      // startup the actual reverting
      this.revertTimer = this.$timeout(() => {
        this.revertOK = true;
      }, 2000);

    }, 1000);
  }

  /**
   * Revert a goal made by this user. The prepareRevertGoal() must be called prior to this method.
   *
   * @param {number} teamId the team id
   * @param {number} playerId the player id
   *
   * @return {void}
   */
  revertGoal(teamId, playerId, $event) {
    if (this.revertTimer && this.reverting === playerId && this.revertOK) {
      //debugger;
      if ($event && $event.originalEvent) {
        $event.originalEvent.preventDefault();
        $event.originalEvent.stopPropagation();
      }

      // Do the actual reverting
      this.gameScoreService.revertScored(teamId, playerId, this.game);
    }

    // Let's cleanup after ourselves...
    if (this.revertTimer) {
      this.$timeout.cancel(this.revertTimer);
      delete this.revertOK;
      delete this.revertTimer;
    }
    if (this.prepareTimer) {
      this.$timeout.cancel(this.prepareTimer);
      delete this.reverting;
      delete this.prepareTimer;
    }
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
    controller: ['$scope', '$state', '$filter', '$timeout', '$ionicPopup', '$ionicHistory', 'gameScoreService', GameInProgressCtrl],
    bindings: {
      game: '<',
      controls: '<'
    }
  });
