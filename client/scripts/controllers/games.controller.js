/* global Games */
angular
  .module('PLeague')
  .controller('GamesCtrl', GamesCtrl);
 
function GamesCtrl ($scope, $reactive, NewGame, NewTeam) {
  $reactive(this).attach($scope);
  console.log('in games controller');
  this.remove = remove;
  this.showNewGameModal = showNewGameModal;

  function showNewGameModal() {
    NewGame.showModal();
  }

  this.helpers({
    data() {
      return Games.find();
    }
  });

  function remove(game) {
      Games.remove(game._id);
  }
}