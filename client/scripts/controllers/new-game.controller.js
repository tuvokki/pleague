/* global Meteor, angular, Teams */
angular
  .module('PLeague')
  .controller('NewGameCtrl', NewGameCtrl);
 
function NewGameCtrl($scope, $reactive, $state, $ionicPopup, NewGame) {
  $reactive(this).attach($scope);
 
  this.hideNewGameModal = hideNewGameModal;
  this.newGame = newGame;

  
  this.helpers({
    teams() {
      return Teams.find({});
    }
  });
 
  function hideNewGameModal() {
    NewGame.hideModal();
  }
  
  function newGame() {
    try {
        Meteor.call('newGame', {name: this.name, claim: this.claim}, function(error){
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
