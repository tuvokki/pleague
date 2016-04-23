import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { NewTeamCtrl } from '/imports/components/teams/new-team.js';

class NewTeamService {
  constructor($rootScope, $ionicModal) {
    this.$rootScope = $rootScope;
    this.$ionicModal = $ionicModal;
    this.templateUrl = 'imports/components/teams/new-team.html';
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: null,
      controller: NewTeamCtrl,
      controllerAs: 'newteam'
    })
      .then((modal) => {
        this.modal = modal;
        this.modal.show();
      });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }

  test() {
    console.log('test');
  }

  static factory($rootScope, $ionicModal) {
    return new NewTeamService($rootScope, $ionicModal);
  }

}

export default angular.module('newteamservice', [
  angularMeteor
])
  .factory('newteamservice', ['$rootScope', '$ionicModal', NewTeamService.factory]);
