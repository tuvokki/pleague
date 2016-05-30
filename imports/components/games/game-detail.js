import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

import template from '/imports/components/games/game-detail.html';

class GameDetailCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      players: () => {
        return Players.find({}, { sort: { name: 1 } });
      }
    });
  }
}

export default angular.module('gamedetail', [
  angularMeteor
])
  .component('gameDetail', {
    templateUrl: 'imports/components/games/game-detail.html',
    controller: ['$scope', GameDetailCtrl],
    bindings: {
      game: '<',
    }
  });
