import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '../../api/players.js';

import template from './settings.html';

class SettingsCtrl {
  constructor($scope, $ionicPopup, $state, $log, usersService) {
    $scope.viewModel(this);
    this.$ionicPopup = $ionicPopup;
    this.$state = $state;
    this.$log = $log;
    this.usersService = usersService;

    console.log('in settings controller');

    this.fullname = () => {
      if(Meteor.user())
      {
        return Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
      }
    }

    this.currentUser = () => {
      return usersService.currentUser();
    }

    this.isAdmin = () => {
      return usersService.isAdmin();
    }

    this.helpers({
      users() {
        return Meteor.users.find()
      }
    });

  }

  doLoginAction() {
    let that = this;
    if (!this.credentials.username) {
      return this.handleError({ reason: 'No username supplied', template: 'You need a username, or create an account.' });
    }
    if (!this.credentials.password) {
      return this.handleError({ reason: 'No password supplied', template: 'You need a password, or create an account.' });
    }
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

  handleError(err) {
    this.$log.error('Login error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: err.template || 'Please try again or create an account',
      okType: 'button-positive button-clear'
    });
  }

}

export default angular.module('settings', [
  angularMeteor
])
  .component('settings', {
    templateUrl: 'imports/components/settings/settings.html',
    controller: ['$scope', '$ionicPopup', '$state', '$log', 'usersService', SettingsCtrl]
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          template: '<settings></settings>'
        }
      }
    })
  });
