/* global Games */
angular
  .module('PLeague')
  .controller('GamesCtrl', GamesCtrl);
 
function GamesCtrl ($scope, $reactive, $ionicPopup, NewGame, GameScore) {
  $reactive(this).attach($scope);
  console.log('in games controller');
  this.remove = remove;
  this.showNewGameModal = showNewGameModal;
  this.scored = scored;
  
  function scored(team) {
    GameScore.scored(team, this.inprogress);
  }

  function showNewGameModal() {
    if (this.inprogress) {
      let confirmPopup = $ionicPopup.confirm({
        title: 'Unable to create game',
        template: 'Cannot add game while a game is in progress.<br><b>Do you want to end this game?</b>'
      });

      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
          return;
        }
      });
    } else {
      NewGame.showModal();
    }
  }

  this.helpers({
    data() {
      return Games.find();
    },
    inprogress() {
      return Games.findOne(
        { endDate: { $exists: false } }
      );
    }
  });

  function remove(game) {
      Games.remove(game._id);
  }
}