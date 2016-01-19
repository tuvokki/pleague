/* global Meteor, angular, Teams */
angular
  .module('PLeague')
  .controller('NewGameCtrl', NewGameCtrl);
 
function NewGameCtrl($scope, $reactive, $state, $ionicPopup, NewGame, NewTeam) {
  $reactive(this).attach($scope);
 
  this.hideNewGameModal = hideNewGameModal;
  this.showNewTeamModal = showNewTeamModal;
  this.newGame = newGame;
  this.selectTeam = selectTeam;

  function showNewTeamModal() {
    NewTeam.showModal();
  }
  
  this.enabled = true;
  // this.subscribe('redteams', () => {
  //   return [ Teams.find({ _id: { $ne: this.getReactively('this.teamBlue._id') } }) ];
  // });
  
  // this.subscribe('blueteams', () => {
  //   return [ Teams.find({ _id: { $ne: this.getReactively('this.teamRed._id') } }) ];
  // });
  
  // this.helpers({
  //   redteams: () => {
  //     return Teams.find({ _id: { $ne: this.getReactively('this.teamBlue._id') } });
  //   },
  //   blueteams: () => {
  //     return Teams.find({ _id: { $ne: this.getReactively('this.teamRed._id') } });
  //   }
  // });

  this.helpers({
    redteams: () => {
      return Teams.find({});
    },
    blueteams: () => {
      return Teams.find({});
    }
  });

  function hideNewGameModal() {
    NewGame.hideModal();
  }
  
  function selectTeam() {
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
  
  function newGame() {
    try {
        Meteor.call('newGame', {teamRed: this.teamRed, teamBlue: this.teamBlue}, function(error){
            if (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error adding Game',
                    template: error.reason
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            } else {
                hideNewGameModal();
                // return $state.go('tab.games', { newGame: this.name });
            }
        });
    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}
