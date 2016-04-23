import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

import template from './teams.html';
import ttemplate from './new-team.html';

class TeamsCtrl {
  constructor($scope, $ionicModal, newteamservice) {
    $scope.viewModel(this);
    this.$ionicModal = $ionicModal;
    this.newteamservice = newteamservice;
    this.templateUrl = 'imports/components/teams/new-team.html';

    console.log('in teams controller');

    this.helpers({
      data() {
        return Teams.find();
      }
    });

  }

  test() {
    console.log('test');
  }

  showNewTeamModal() {
    this.newteamservice.showModal();
    // // this.scope = this.$rootScope.$new();
    // let that = this;
    // this.$ionicModal.fromTemplateUrl(this.templateUrl, {
    //   scope: this.$scope,
    //   animation: 'slide-in-up'
    // }).then(function (modal) {
    //   that.modal = modal;
    //   that.modal.show();
    // });

    // this.$ionicModal.fromTemplateUrl(this.templateUrl, {
    //   scope: this.scope,
    // })
    //   .then((modal) => {
    //     this.modal = modal;
    //     this.modal.show();
    //   });
  }

}

export default angular.module('teams', [
  angularMeteor
])
  .component('teams', {
    templateUrl: 'imports/components/teams/teams.html',
    controller: ['$scope', '$ionicModal', 'newteamservice', TeamsCtrl],
    controllerAs: 'teams'
  });