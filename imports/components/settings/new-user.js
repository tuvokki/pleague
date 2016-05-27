import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '../../api/players.js';

import template from '/imports/components/settings/new-user.html';

class NewUserCtrl {
  constructor($scope, $state, $ionicPopup, $ionicHistory) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.$ionicHistory = $ionicHistory;

    this.credentials = {};

    this.helpers({
      players() {
        return Players.find({});
      }
    });
  }

  goBack() {
    this.$state.go('tab.settings');
  }

  allReady() {
    if (this.credentials.username && this.credentials.email && this.credentials.password && this.profile.firstname && this.profile.lastname) {
      return true;
    }
    return false;
  }

  newUser() {
    let that = this;
    try {
      // TODO: this is insecure, should be moved to serverside call:http://guide.meteor.com/accounts.html
      Accounts.createUser({
        username: this.credentials.username,
        email: this.credentials.email,
        password: this.credentials.password,
        profile: {
          //publicly visible fields like firstname goes here
          firstname: this.profile.firstname,
          lastname: this.profile.lastname
        }
      }, (error) => {
        if (error) {
          // :(
          console.log(error);
          return;
        }
        // that.hideNewUserModal();
        that.$state.go('tab.settings');
      });

    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }

}

export default angular.module('newuser', [
    angularMeteor
  ])
  .component('newuser', {
    templateUrl: 'imports/components/settings/new-user.html',
    controller: ['$scope', '$state', '$ionicPopup', '$ionicHistory', NewUserCtrl]
  })
  .config(($stateProvider) => {
    $stateProvider.state('tab.newuser', {
      url: '/user/new',
      views: {
        'tab-settings': {
          template: '<newuser></newuser>'
        }
      }
    })
  });
