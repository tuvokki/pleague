import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

import template from '/imports/components/games/new-game.html';

class NewGameCtrl {
  constructor($scope, $state, $ionicPopup, $ionicHistory) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.$ionicHistory = $ionicHistory;

    console.log('in new-game controller');

    this.enabled = true;

    this.helpers({
      players: () => {
        return Players.find({});
      },
      redteams: () => {
        return Teams.find({});
      },
      blueteams: () => {
        return Teams.find({});
      }
    });
  }
  
  selectPlayer(id) {
    console.log("selected: " + id);
  }

  selectTeam() {
    //TODO: team cannot have the same PLAYER as opposite team!
    console.log('team red: ' + this.teamRed);
    console.log('team blue: ' + this.teamBlue);
    if (this.teamRed && this.teamBlue && this.teamRed._id != this.teamBlue._id) {
      delete this.selectMessage;
      this.enabled = false;
    } else {
      if (this.teamRed && this.teamBlue) {
        this.selectMessage = 'You can\'t select the same team twice';
      }
      this.enabled = true;
    }
  }

  goBack() {
    this.$ionicHistory.goBack();
  }
  
  newGame() {
    let that = this;
    try {
      Meteor.call('newGame', { teamRed: this.teamRed, teamBlue: this.teamBlue }, (error) => {
        if (error) {
          var alertPopup = that.$ionicPopup.alert({
            title: 'Error adding Game',
            template: error.reason
          });

          alertPopup.then((res) => {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        } else {
          that.$ionicHistory.goBack();
        }
      });
    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }
}

export default angular.module('newgame', [
  angularMeteor
])
  .component('newgame', {
    templateUrl: 'imports/components/games/new-game.html',
    controller: ['$scope', '$state', '$ionicPopup', '$ionicHistory', NewGameCtrl],
    controllerAs: 'newgame'
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.newgame', {
      url: '/games/new',
      views: {
        'tab-games': {
          template: '<newgame></newgame>'
        }
      }
    })
  });
