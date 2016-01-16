angular
  .module('PLeague')
  .controller('LeaderboardCtrl', LeaderboardCtrl);
 
function LeaderboardCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in leaderboard controller');
}