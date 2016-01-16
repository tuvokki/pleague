angular
  .module('PLeague')
  .controller('PlayersCtrl', PlayersCtrl);
 
function PlayersCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in players controller');
}