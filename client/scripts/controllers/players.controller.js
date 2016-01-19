angular
  .module('PLeague')
  .controller('PlayersCtrl', PlayersCtrl);
 
function PlayersCtrl ($scope, $reactive, NewPlayer) {
  $reactive(this).attach($scope);
  console.log('in players controller');

  this.showNewPlayerModal = showNewPlayerModal;

  this.helpers({
    data() {
      return Players.find();
    }
  });

  function showNewPlayerModal() {
    NewPlayer.showModal();
  }
}