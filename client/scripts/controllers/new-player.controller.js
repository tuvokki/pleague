/* global Meteor, angular, Players */
angular
  .module('PLeague')
  .controller('NewPlayerCtrl', NewPlayerCtrl);
 
function NewPlayerCtrl($scope, $reactive, $state, $ionicPopup, NewPlayer) {
  $reactive(this).attach($scope);
 
  this.hideNewPlayerModal = hideNewPlayerModal;
  this.newPlayer = newPlayer;

  
  this.helpers({
    //   find all other users
    // users() {
    //   return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    // }
  });
 
  ////////////
 
  function hideNewPlayerModal() {
    NewPlayer.hideModal();
  }
  
  function newPlayer() {
    try {
        Meteor.call('newPlayer', {name: this.name, claim: this.claim}, function(error){
            if (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error adding player',
                    template: error.reason
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            } else {
                hideNewPlayerModal();
                // return $state.go('tab.games', { newPlayer: this.name });
            }
        });
    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}
