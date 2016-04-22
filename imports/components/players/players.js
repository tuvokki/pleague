import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';

import template from './players.html';

class PlayersCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    
    console.log('in players controller');

    this.helpers({
      data() {
        return Players.find();
      }
    });

  }
  
  showNewPlayerModal() {
    this.NewPlayer.showModal();
  }
}

PlayersCtrl.$inject = ['$scope', 'NewPlayer'];

export default angular.module('players', [
  angularMeteor
])
  .component('players', {
    templateUrl: 'imports/components/players/players.html',
    controller: ['$scope', PlayersCtrl],
    controllerAs: 'players'
  });