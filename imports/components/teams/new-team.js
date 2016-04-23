import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';

import template from '/imports/components/teams/new-team.html';

class NewTeamCtrl {
  constructor($scope, $state, $ionicPopup, NewPlayer) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.NewPlayer = NewPlayer;
    
    console.log('in new-team controller');

    this.helpers({
      players() {
        return Players.find({});
      }
    });
  }

  showNewPlayerModal() {
    this.NewPlayer.showModal();
  }
  test(){
    console.log('test');
  }
  newTeam() {
    let that = this;
    try {
      Meteor.call('newTeam', { players: [this.playerOne._id, this.playerTwo._id] }, (error) => {
        if (error) {
          var alertPopup = that.$ionicPopup.alert({
            title: 'Error adding Team',
            template: error.reason
          });

          alertPopup.then((res) => {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        } else {
          that.$state.go('tab.teams')
        }
      });
    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }

}


export default angular.module('newteam', [
  angularMeteor
])
  .component('newteam', {
    templateUrl: 'imports/components/teams/new-team.html',
    controller: ['$scope', '$state', '$ionicPopup', 'NewPlayer', NewTeamCtrl],
    controllerAs: 'newteam'
  });
