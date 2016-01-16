angular
  .module('PLeague')
  .controller('TeamsCtrl', TeamsCtrl);
 
function TeamsCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in teams controller');
}