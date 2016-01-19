/* global Meteor, angular, Players */
angular
  .module('PLeague')
  .controller('NewTeamCtrl', NewTeamCtrl);
 
function NewTeamCtrl($scope, $reactive, $state, $ionicPopup, NewTeam, NewPlayer) {
  $reactive(this).attach($scope);
 
  this.hideNewTeamModal = hideNewTeamModal;
  this.showNewPlayerModal = showNewPlayerModal;
  this.newTeam = newTeam;
  
  this.helpers({
    players() {
      return Players.find({});
    }
  });
 
  function hideNewTeamModal() {
    NewTeam.hideModal();
  }
  
  function showNewPlayerModal() {
    NewPlayer.showModal();
  }

  function newTeam() {
    try {
        Meteor.call('newTeam', {players: [this.playerOne._id, this.playerTwo._id]}, function(error){
            if (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error adding Team',
                    template: error.reason
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            } else {
                hideNewTeamModal();
                // return $state.go('tab.teams', { newTeam: this.name });
            }
        });
    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}
