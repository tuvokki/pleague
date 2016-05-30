import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

import tabTemplate from './teams.html';
import listTemplate from './teamsList.html';
import detailTemplate from './teamDetail.html';

class TeamsCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      teamsList() {
        return Teams.find();
      }
    });

  }
}

export default angular.module('teams', [
  angularMeteor
])
  .component('teams', {
    templateUrl: 'imports/components/teams/teams.html'
  })
  .component('teamsList', {
    templateUrl: 'imports/components/teams/teamsList.html',
    controller: ['$scope', TeamsCtrl],
    bindings: {
      max: '<'
    }
  })
  .component('teamDetail', {
    templateUrl: 'imports/components/teams/teamDetail.html',
    controller: ['$scope', TeamsCtrl],
    bindings: {
      team: '<',
      rank: '<'
    }
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.teams', {
      url: '/teams',
      views: {
        'tab-teams': {
          template: '<teams></teams>'
        }
      }
    })
  });
