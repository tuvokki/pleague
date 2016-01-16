angular
  .module('PLeague')
  .controller('GamesCtrl', GamesCtrl);
 
function GamesCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in games controller');
}