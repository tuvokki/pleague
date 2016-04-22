import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '../../api/players.js';

import template from './settings.html';

class SettingsCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    console.log('in settings controller');

    this.currentUser = function () {
      if (Meteor.user() == null) {
        return true;
      }
      return false;
    }

    this.helpers({
    });

  }

  doLoginAction() {
    let that = this;
    Meteor.loginWithPassword(this.credentials.username, this.credentials.password, (error) => {
      if (error) {
        // :(
        return that.handleError(error);
      }
      that.$state.go('tab.players');
    });
  }

  doLogoutAction() {
    let that = this;
    Meteor.logout(function () {
      // Redirect to login
      that.$state.go('tab.settings');
    });
  }

  showNewUserModal() {
    this.NewUser.showModal();
  }

  handleError(err) {
    this.$log.error('Login error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again or create an account',
      okType: 'button-positive button-clear'
    });
  }

}

SettingsCtrl.$inject = ['$scope', '$ionicPopup', '$state', '$log', 'NewUser'];

export default angular.module('settings', [
  angularMeteor
])
  .component('settings', {
    templateUrl: 'imports/components/settings/settings.html',
    controller: ['$scope', SettingsCtrl],
    controllerAs: 'settings'
  });