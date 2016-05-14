import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '../../api/players.js';
import { Games } from '../../api/games.js';

import template from './dashBoard.html';

class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    console.log('in dashBoard controller');

    this.helpers({
      playersList() {
        return Players.find();
      },
      inprogress() {
        return Games.findOne(
          { endDate: { $exists: false } }
        );
      }
    });
  }
}

export default angular.module('dashBoard', [
  angularMeteor
])
  .component('dashBoard', {
    templateUrl: 'imports/components/dashBoard/dashBoard.html',
    controller: ['$scope', DashboardCtrl]
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.dashboard', {
      url: '/dashboard',
      views: {
        'tab-dashboard': {
          template: '<dash-board></dash-board>'
        }
      }
    })
  });
