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
    this.selectWhatPlayer = 'defense';
    this.selectTeam = 'red';
    this.selectedPlayers = [];
    this.teamRed = {};
    this.teamBlue = {};
    
    this.helpers({
      players: () => {
        return Players.find({ _id: { $nin: this.getReactively('selectedPlayers') } }, { sort: { name: 1 } });
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
    this.selectedPlayers = this.selectedPlayers.concat([id]);
    // TODO: the following code relies heavily on the sequential nature of the team select and should be replaced with a selectstate
    if (this.selectTeam == 'red') {
      if (this.selectWhatPlayer == 'defense') {
        this.teamRed.defender = id;
        this.selectWhatPlayer = 'offence';
      } else {
        this.teamRed.attacker = id;
        this.selectWhatPlayer = 'defense';
        this.selectTeam = 'blue';
      }      
    } else {
      if (this.selectWhatPlayer == 'defense') {
        this.teamBlue.defender = id;
        this.selectWhatPlayer = 'offence';
      } else {
        this.teamBlue.attacker = id;
        //reset
        this.selectWhatPlayer = 'defense';
        this.selectTeam = 'red';
      }      
    }
    if (this.selectedPlayers.length == 4) {
      this.newGame();
      this.$state.go('tab.games');
    }
  }

  selectTeam() {
    //TODO: team cannot have the same PLAYER as opposite team!
    console.log('team red: ' + this.teamBlue);
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
          // that.$ionicHistory.goBack();
        }
      });
    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }
  
    // TODO: copied from the new-team.js component
    newTeam() {
    let that = this;
    try {
      Meteor.call('newTeam', { players: [this.playerOne._id, this.playerTwo._id] }, (error, result) => {
        if (error) {
          // var alertPopup = that.$ionicPopup.alert({
          //   title: 'Error adding Team',
          //   template: error.reason
          // });

          // alertPopup.then((res) => {
          //   console.log('Thank you for not eating my delicious ice cream cone');
          // });
        } else {
          // that.$ionicHistory.goBack();
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
